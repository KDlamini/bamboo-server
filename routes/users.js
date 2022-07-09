const express = require('express');

const router = express.Router();

const { getUser, getUsers } = require('../controllers/fetchUsers');
const createUser = require('../controllers/createUser');

// @route   GET users
// @access  Public
router.get('/', getUsers);

// @route   GET users/:id
// @access  Public
router.get('/:id', getUser);

// @route   POST users
// @access  Public
router.post('/', createUser);

module.exports = router;
