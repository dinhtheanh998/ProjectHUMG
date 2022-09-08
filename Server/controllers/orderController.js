const mongoose = require("mongoose");
// const OrderDetails = mongoose.model("OrderDetails")
const order = mongoose.model("Order");

exports.listAllOrder = (req, res) => {
  order.find({}, (err, orders) => {
    if (err) res.send(err);
    res.json(orders);
  });
};

exports.createOrder = (req, res) => {
  console.log(req.body.details);
  const detailsArr = [];
  for (let i = 0; i < req.body.details.length; i++) {
    detailsArr.push(req.body.details[i]);
  }
  const newOrder = new order({
    ...req.body,
    details: detailsArr,
  });

  // const idOrder = req.body.idOrder;
  // console.log(idOrder);
  // const orderDetails = new OrderDetails({
  //     idOrder: idOrder,
  //     ...req.body
  // })
  newOrder.save((err, orders) => {
    // if (err) res.send(err)
    if (err) {
      response = { error: true, message: "Error adding data" };
    } else {
      response = { error: false, message: "Data added", id: orders._id };
    }
    res.json(orders);

    // return res.json(_newID)
  });
  // console.log(idOrder);
  // orderDetails.save((err, orderDetails) => {
  //     if (err) res.send(err)
  //     res.json(orderDetails)
  // })
};

exports.getOrderByCondition = (req, res) => {
  console.log(req.params.query);
  if (req.params.query.length <= 10) {
    req.params.query = req.params.query;
  } else {
    req.params.query = mongoose.Types.ObjectId(req.params.query);
  }
  if (req.params.query == "" || req.params.query == undefined) {
    order.find({}, (err, orders) => {
      if (err) res.send(err);
      res.json(orders);
    });
  }
  order.aggregate(
    [
      {
        $match: {
          $or: [{ _id: { $regex:'.*'+req.params.query+'.*',$options:"$gi"} }, { phone: { $regex:'.*'+req.params.query+'.*',$options:"$gi"} }],
        },
      },
    ],
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};

exports.updateStateOrder = (req, res) => {
  order.findByIdAndUpdate(
    req.params.id,
    { $set: { state: req.body.state } },
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};

exports.getStatistical = (req, res) => {
  order.aggregate(
    [
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
        },
      },
    ],
    (err, orders) => {
      if (err) res.send(err);
      res.json(orders);
    }
  );
};

exports.getProfitOrderNowMonth = (req, res) => {
  order
    .aggregate(
      [
        {
          $project: {
            state: 1,
            month: { $month: "$updatedAt" },
            total: 1,
          },
        },
        {
          $match: {
            month: new Date().getMonth() + 1,
          },
        },
        {
          $group: {
            _id: "$state",
            total: { $sum: "$total" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            state: "$_id",
            total: 1,
            count: 1,
          },
        },
      ],
      (err, orders) => {
        if (err) res.send("Không có đơn hàng thành công");
        const { total } = orders[0];
        res.json(orders);
      }
    )
    .sort({ _id: 1 });
};

exports.getProfitPerMonth = (req, res) => {
  order
    .aggregate(
      [
        {
          $project: {
            state: 1,
            month: { $month: "$updatedAt" },
            day: { $dayOfMonth: "$updatedAt" },
            total: 1,
          },
        },
        {
          $match: {
            state: "Thành công",
            month: new Date().getMonth() + 1,
          },
        },
        {
          $group: {
            _id: "$day",
            date: { $first: "$day" },
            total: { $sum: "$total" },
          },
        },
      ],
      (err, orders) => {
        if (err) res.send(err);
        res.json(orders);
      }
    )
    .sort({ _id: 1 });
};

exports.getProfitMonthly = (req, res) => {
  order
    .aggregate(
      [
        {
          $project: {
            state: 1,
            month: { $month: "$updatedAt" },
            total: 1,
          },
        },
        {
          $match: {
            state: "Thành công",
          },
        },
        {
          $group: {
            _id: "$month",
            Month: { $first: "$month" },
            total: { $sum: "$total" },
          },
        },
      ],
      (err, orders) => {
        if (err) res.send(err);
        res.json(orders);
      }
    )
    .sort({ _id: 1 });
};

exports.getOrderByState = (req, res) => {
  order.aggregate(
    [
      {
        $match: {
          state: req.params.state,
        },
      },
    ],
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};

exports.getPriceByTime = (req, res) => {
  console.log(req.params);
  order.aggregate(
    [
      {
        $project: {
          _id: "$details._id",
          name: "$details.name",
          price: "$details.unitPromotionalPrice",
          state: "$state",
          updatedAt: "$updatedAt"     
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $unwind: "$name",
      },
      
      {
        $match: {
          state: "Thành công",
          _id: req.params.id,
        },
      },   
      
      {
        $group: {
          // _id: { day: { "$dayOfMonth": "$updatedAt" }, "month": { $month: "$updatedAt" } },
          // "_id":{"year":{"$year":"$updatedAt"}} ,
          _id: "$_id",
          "transactions":{"$push":"$$ROOT"},
          // unitPromotionalPrice: { $addToSet: "$price" },
        },
      },
      { $sort: { "day": -1, "month": -1 } },
      {
        $project: {
          price: "$transactions.price" ,
        }
      }
      
      // {"$sort":{"$updatedAt":1}},
      
    ],
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};

exports.getOrderbyUser = (req, res) => { 
  order.aggregate(
    [
      {
        $match: {
          userName: req.params.id,
        },
      },
    ],
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
}

exports.getProfitBySelectDay = (req, res) => {
  console.log(+req.params.day);
  order.aggregate(
    [
      {
        $project: {
          state: 1,
          day: { $dayOfMonth: "$updatedAt" },
          month: { $month: "$updatedAt" },
          year: { $year: "$updatedAt" },
          total: 1,
        },
      },
      {
        $match: {
          state: "Thành công",
          day: +req.params.day,
          month: +req.params.month,
          year: +req.params.year,
        },
      },
      {
        $group: {
          _id: "$state",
          total: { $sum: "$total" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          state: "$_id",
          total: 1,
          count: 1,
        },
      },
    ],
    (err, orders) => {
      if (err) res.send(err);
      res.json(orders);
    }
  );
}

exports.getOrderByDateRange = (req, res) => {
  console.log(req.params);
  order.aggregate(
    [
      {
        $project: {
          state: 1,
          updatedAt: 1,
          // day: { $dayOfMonth: "$updatedAt" },
          // month: { $month: "$updatedAt" },
          // year: { $year: "$updatedAt" },
          total: 1,
        },
      },
      {
        $match: {
          state: "Thành công",
          updatedAt: { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) },
          // day: { $gte: +req.params.day1, $lte: +req.params.day2 },
          // month: { $gte: +req.params.month1, $lte: +req.params.month2 },
          // year: { $gte: +req.params.year1, $lte: +req.params.year2 },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%d/%m/%Y", date: "$updatedAt" } },
          total: { $sum: "$total" },
          count: { $sum: 1 },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $project: {          
          total: 1,
          count: 1,
          updatedAt: 1,
        },
      },
    ],
    (err, orders) => {
      if (err) res.send(err);
      res.json(orders);
    }
  ).sort({updatedAt:1});
}