const stripe = require('stripe')('sk_test_51LLkufIMZeVYl1jrdjwjNOvDt1oCnJR5AcVO0iyqngoVfA4nSoyraY5eVs909FQ0XfffKAegeBzGmyY1vCNwdSkJ00tzZ5G1I3');

// @desc    POST a payment
const createPayment = async (req, res) => {

    try {
        const order = req.body;
        const payment = await stripe.paymentIntents.create({
            amount: order.price * 100,
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: order.email,
            description: `Order #${order.id}`,
            metadata: {
                order_id: order.id
            }
        });

        res.status(200).send(payment);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = createPayment