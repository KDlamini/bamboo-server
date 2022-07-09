const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const { authUser, getAuthUser } = require('../controllers/authUser');

// @route   POST auth
// @access  Public
router.post('/', authUser);

// @route   GET auth/user
// @access  Private
router.get('/user', auth, getAuthUser);

module.exports = router;
