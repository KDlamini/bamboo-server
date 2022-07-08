const express = require('express');

const router = express.Router();

const { getUser, getUsers } = require('../controllers/fetchUsers');
const createUser = require('../controllers/createUser');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;
