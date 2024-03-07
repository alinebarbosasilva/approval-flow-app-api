const express = require('express');
const router  = express.Router();

const { login, logout } = require('../controllers/auth.controllers');

router.post('/login', login);

router.get('/logout', logout);

module.exports = router;
