// const Payments = require('../models/payment');

// @desc    POST a payment
const createPayment = async (req, res) => {

    try {
        const payment = req.body;
        // const data = await Payments.findOneAndUpdate({_id: id}, {$push: {payments: payment}});

        // res.status(200).json(data);
        res.send('Payment received for.', payment);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = createPayment