const Users = require('../models/user');

// @desc    POST a new address
const postAddress = async (req, res) => {

    try {
        const { id } = req.params;
        const address = req.body;
        const data = await Users.findOneAndUpdate({_id: id}, {$push: {billing_address: address}});

        res.status(200).json({ data: data.billing_address, status: 200 });
    } catch (error) {
        res.status(404).json({ message: error.message, status: 404 });
    }
}

// @desc    POST remove address
const removeAddress = async (req, res) => {
    try {
        const { user_id, id } = req.params;
        const data = await Users.updateOne({ _id: user_id }, { $pull: { billing_address: {_id: id } } } )
        

        res.status(200).json({ data: data, status: 200 });
    } catch (error) {
        res.status(404).json({ message: error.message, status: 404 });
    }
}

module.exports = { postAddress, removeAddress };