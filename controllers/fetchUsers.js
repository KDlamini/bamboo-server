const Users = require('../models/user');

const getUser = async (req, res) => {
    const { id:_id } = req.params;
    try {
        const data = await Users.findOne({_id});

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}


const getUsers = async (req, res) => {
    try {
        const data = await Users.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

module.exports = {getUser, getUsers};