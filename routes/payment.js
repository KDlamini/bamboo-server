const express = require('express');

const router = express.Router();

const createPayment = require('../controllers/payments');

// @route   POST users/register
// @access  Public
router.post('/create', createPayment);

module.exports = router;
