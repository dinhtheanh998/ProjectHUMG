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
          $or: [{ _id: req.params.query }, { phone: req.params.query }],
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

exports.testQuery = (req, res) => {
  order.aggregate(
    [
      {
        $match: {
          state: "Thành công",          
        },
      },      
      {
        $group: {
          _id: "$details._id",
          fullName: { $first: "$details.name" },
          unitPromotionalPrice: { $push: "$details.unitPromotionalPrice" },
          // name:{$push :"$fullName"},
          // quantity: { $push: "$details.quantity" },
        },
      },
      {
        $unwind: "$_id",
      },
      {
        $unwind: "$fullName",
      },
      
      // {
      //   $match: {
      //     _id: mongoose.Types.ObjectId("62ee79d32670e798111e62b1"),
      //   }
      // }
      
      
    ],
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};
