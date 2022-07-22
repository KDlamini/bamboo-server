require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    POST a payment
const createPayment = async (req, res) => {

    try {
        const { order } = req.body;

        const line_items = order.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        metadata: {
                            id: item._id,
                            type: item.type,
                            brand: item.brand,
                            color: item.color,
                            description: item.description,
                        },
                    },
                    unit_amount: item.discountPrice ? item.discountPrice * 100 : item.price * 100,
                },
                quantity: item.quantity,
            };
        }
        );

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/order_receipt`,
            cancel_url: `${process.env.CLIENT_URL}/review_order`,
        });
        
        res.send({ url: session.url });
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = createPayment