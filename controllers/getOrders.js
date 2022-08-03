const Orders = require('../models/order');

// @desc    GET all orders
const getOrders = async (req, res) => {
    try {
        const data = await Orders.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = getOrders