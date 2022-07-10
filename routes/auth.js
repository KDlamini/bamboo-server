const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const { authUser, getAuthUser } = require('../controllers/authUser');

// @route   POST auth/login
// @access  Public
router.post('/login', authUser);

// @route   GET auth/user
// @access  Private
router.get('/user', auth, getAuthUser);

module.exports = router;
