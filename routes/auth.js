const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const { authUser, getAuthUser } = require('../controllers/authUser');
const { postAddress, removeAddress, updateAddress } = require('../controllers/userAddress');

// @route   POST auth/login
// @access  Public
router.post('/login', authUser);

// @route   GET auth/user
// @access  Private
router.get('/user', auth, getAuthUser);

// @route   POST auth/user/:id/add_address
// @access  Private
router.post('/user/:id/address', auth, postAddress);

// @route   POST auth/user/:user_id/address/:id
// @access  Private
router.post('/user/:user_id/address/:id', auth, removeAddress);


// @route   POST auth/user/:user_id/address/:id
// @access  Private
router.post('/user/:user_id/address/:id/edit', auth, updateAddress);

module.exports = router;
