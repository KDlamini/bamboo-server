const express = require('express');

const router = express.Router();
const getProducts = require('../controllers/getProducts');
const postReview = require('../controllers/postReview');

// @route   GET products
// @access  Public
router.get('/', getProducts);

// @route   POST products/:id/add_review
// @access  Public
router.post('/:id/review', postReview);

module.exports = router;