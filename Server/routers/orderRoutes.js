const express = require('express');
const orderBuilder = require('../controllers/orderController')

const router = express.Router();

router.get('/', orderBuilder.listAllOrder)
router.post('/', orderBuilder.createOrder)
router.put("/:id", orderBuilder.updateStateOrder)
router.get('/statistical', orderBuilder.getStatistical)
router.get('/getProfitNowMonth', orderBuilder.getProfitOrderNowMonth)
router.get('/getProfitPermonth', orderBuilder.getProfitPerMonth)
router.get('/getProfitMonthly', orderBuilder.getProfitMonthly)
module.exports = router