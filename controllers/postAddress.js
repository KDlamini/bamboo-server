const Users = require('../models/user');

// @desc    POST a review
const postAddress = async (req, res) => {

    try {
        const { id } = req.params;
        const address = req.body;
        const data = await Users.findOneAndUpdate({_id: id}, {$push: {billing_address: address}});

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = postAddress