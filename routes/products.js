const express = require('express');

const router = express.Router();
const getProducts = require('../controllers/getProducts');

router.get('/', getProducts);

module.exports = router;