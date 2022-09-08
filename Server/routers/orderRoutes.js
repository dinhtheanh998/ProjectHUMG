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
// lấy giá sản phẩm theo thời gian
router.get('/test/testQuery/:id', orderBuilder.getPriceByTime)
// lấy đơn hàng theo tài khoản
router.get('/v1/getOrderbyUser/:id', orderBuilder.getOrderbyUser)
// lấy đơn hàng theo ngày đã chọn
router.get('/v1/getOrderbyDate/?day=:day&?month=:month&?year=:year', orderBuilder.getProfitBySelectDay)
// lấy đơn hàng giữa 2 ngày đã chọn
router.get('/v1/getOrderbyDateRange/?startDate=:startDate&?endDate=:endDate', orderBuilder.getOrderByDateRange)

module.exports = router