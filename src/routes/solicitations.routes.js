
const express = require('express');
const router  = express.Router();

const { getSolicitations, createSolicitation, getSolicitation } = require('../controllers/solicitations.controllers')

router.get('/solicitations/', getSolicitations)

router.get('/solicitations/:id', getSolicitation);

router.post('/solicitations/', createSolicitation);

module.exports = router;