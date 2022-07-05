const Products = require('../models/product');

const postReview = async (req, res) => {
    const { id: _id } = req.params;
    const review = req.body;

    try {
        const product = await Products.findById(id);
        const data = await Products.findByIdAndUpdate(id, { reviews: product.reviews.push(review) }, { new: true })

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = postReview