const express = require('express');
const orderBuilder = require('../controllers/orderController')

const router = express.Router();

router.get('/', orderBuilder.listAllOrder)
router.post('/', orderBuilder.createOrder)
router.put("/:id", orderBuilder.updateStateOrder)
router.get('/?query=:query', orderBuilder.getOrderByCondition)
router.get('/statistical', orderBuilder.getStatistical)
router.get('/getProfitNowMonth', orderBuilder.getProfitOrderNowMonth)
router.get('/getProfitPermonth', orderBuilder.getProfitPerMonth)
router.get('/getProfitMonthly', orderBuilder.getProfitMonthly)
router.get('/getOrderByState/?state=:state', orderBuilder.getOrderByState)
router.get('/test/testQuery', orderBuilder.testQuery)
module.exports = router