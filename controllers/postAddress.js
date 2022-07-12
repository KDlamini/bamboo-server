const Users = require('../models/user');

// @desc    POST a new address
const postAddress = async (req, res) => {

    try {
        const { id } = req.params;
        const address = req.body;
        const data = await Users.findOneAndUpdate({_id: id}, {$push: {billing_address: address}});

        res.status(200).json({ data, status: 200 });
    } catch (error) {
        res.status(404).json({ message: error.message, status: 404 });
    }
}

module.exports = postAddress