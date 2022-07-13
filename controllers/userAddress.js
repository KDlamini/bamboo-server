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

// @desc    POST update address
const updateAddress = async (req, res) => {
    try {
        const { user_id, id } = req.params;
        const { username, phone, house_name, street, city, state, zip } = req.body;

        const data = await Users.updateOne(
            { _id: user_id },
            {
                $set: {
                    "billing_address.$[address].username": username,
                    "billing_address.$[address].phone": phone,
                    "billing_address.$[address].house_name": house_name,
                    "billing_address.$[address].street": street,
                    "billing_address.$[address].city": city,
                    "billing_address.$[address].state": state,
                    "billing_address.$[address].zip": zip,
                }
            },
            {
                arrayFilters: [ { "address._id": id} ]
            }
         )
        

        res.status(200).json({ data: data, status: 200 });
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

module.exports = { postAddress, removeAddress, updateAddress };