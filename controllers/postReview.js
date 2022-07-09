const Products = require('../models/product');

// @desc    POST a review
const postReview = async (req, res) => {

    try {
        const { id } = req.params;
        const review = req.body;
        const data = await Products.findOneAndUpdate({_id: id}, {$push: {reviews: review}});

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = postReview