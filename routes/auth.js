const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const { authUser, getAuthUser } = require('../controllers/authUser');
const postAddress = require('../controllers/postAddress');

// @route   POST auth/login
// @access  Public
router.post('/login', authUser);

// @route   GET auth/user
// @access  Private
router.get('/user', auth, getAuthUser);

// @route   POST auth/user/:id/add_address
// @access  Private
router.post('/user/:id/add_address', auth, postAddress);

module.exports = router;
