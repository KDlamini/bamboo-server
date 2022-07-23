const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const { createPayment, eventHook } = require('../controllers/payments');

// @route   POST payment/create
// @access  Public
router.post('/stripe/create-checkout-session', createPayment);

// @route   POST payment/webhook
// @access  Public
router.post('/webhook', bodyParser.raw({type: 'application/json'}), eventHook);

module.exports = router;
