const express = require('express');

const router = express.Router();
const getProducts = require('../controllers/getProducts');
const postReview = require('../controllers/postReview');

router.get('/', getProducts);
router.patch('/:id/add_review', postReview);

module.exports = router;