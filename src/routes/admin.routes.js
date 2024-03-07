const express = require('express');
const router = express.Router();

const {
    getAdminSolicitations,
} = require('../controllers/admin.controllers')

router.get('/admin/solicitations', getAdminSolicitations)

module.exports = router;