const express = require('express');

const router = express.Router();

const createPayment = require('../controllers/payments');

// @route   POST payment/create
// @access  Public
router.post('/create', createPayment);

module.exports = router;
