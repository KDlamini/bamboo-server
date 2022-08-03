const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');

const router = express.Router();

const { createPayment, eventHook } = require('../controllers/payments');
const getOrders  = require('../controllers/getOrders');

// @route   POST payment/create
// @access  Public
router.post('/stripe/create-checkout-session', createPayment);

// @route   POST payment/webhook
// @access  Public
router.post('/webhook', bodyParser.raw({type: 'application/json'}), eventHook);

// @route   GET payment/orders
// @access  Public
router.get('/orders', auth, getOrders);

module.exports = router;
