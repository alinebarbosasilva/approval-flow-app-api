const express = require('express');
const router = express.Router();

const {
    getWarehousemanSolicitations,
    getWarehousemanSolicitation,
    approveWarehousemanSolicitation,
    reproveWarehousemanSolicitation
} = require('../controllers/warehouseman.controllers')

router.get('/warehouseman/solicitations', getWarehousemanSolicitations)

router.get('/warehouseman/solicitations/:id', getWarehousemanSolicitation)

router.patch('/warehouseman/solicitations/:id/approve', approveWarehousemanSolicitation);

router.patch('/warehouseman/solicitations/:id/reprove', reproveWarehousemanSolicitation);

module.exports = router;