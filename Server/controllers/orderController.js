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
  order.aggregate(
    [
      {
        $project: {
          state: 1,
          month: { $month: "$createdDate" },          
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
          _id: "$state",
          total: { $sum: "$total" },
        },
      },
    ],
    (err, orders) => {
      if (err) res.send(err);
      const { total } = orders[0];
      res.json(total);
    }
  );
};

exports.getProfitPerMonth = (req, res) => {
  order
    .aggregate(
      [
        {
          $project: {
            state: 1,
            month: { $month: "$createdDate" },
            day: { $dayOfMonth: "$createdDate" },
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
            "date": { $first: "$day" },
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
  order.aggregate(
    [
      {
        $project: {
          state: 1,
          month: { $month: "$createdDate" },
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
          "Month": { $first: "$month" },
          total: { $sum: "$total" },
        },
      },
    ],
    (err, orders) => {
      if (err) res.send(err);
      res.json(orders);
    }
  ).sort({ _id: 1 });;
}
