const Products = require('../models/product');

const postReview = async (req, res) => {
    const { id: _id } = req.params;
    const review = req.body;

    try {
        // const product = await Products.findById(_id);
        const data = await Products.findByIdAndUpdate(_id,
            { $push: { reviews: review  } },
            (error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
            });

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = postReview