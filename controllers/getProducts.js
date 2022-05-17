const Products = require('../models/product');

const getProducts = async (req, res) => {
    try {
        const data = await Products.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = getProducts