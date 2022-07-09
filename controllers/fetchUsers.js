const Users = require('../models/user');

// @desc    GET a user by id
const getUser = async (req, res) => {
    try {
        const { id:_id } = req.params;
        const data = await Users.findById(_id);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

// @desc    GET all users
const getUsers = async (req, res) => {
    try {
        const data = await Users.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = {getUser, getUsers};