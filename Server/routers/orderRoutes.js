const express = require('express');
const orderBuilder = require('../controllers/orderController')

const router = express.Router();

router.get('/', orderBuilder.listAllOrder)
router.post('/', orderBuilder.createOrder)

module.exports = router