const mongoose = require("mongoose");
const OrderDetails = mongoose.model("OrderDetails")
const order = mongoose.model("Order")

exports.listAllOrder = (req, res) => {
    order.find({}, (err, orders) => {
        if (err) res.send(err)
        res.json(orders)
    })
}

exports.createOrder =  (req, res) => {
    console.log(req.body.details)
    const detailsArr = []
    for (let i = 0; i < req.body.details.length; i++) {
        detailsArr.push(req.body.details[i])
    }
    const newOrder = new order({
        ...req.body,
        details: detailsArr
    });   

    // const idOrder = req.body.idOrder;
    // console.log(idOrder);
    // const orderDetails = new OrderDetails({
    //     idOrder: idOrder,
    //     ...req.body
    // })    
    newOrder.save((err, orders) => {
        // if (err) res.send(err)
        if(err) {
            response = { error: true, message: "Error adding data" };
          } else {
            response = { error: false, message: "Data added", id: orders._id };
          }
        res.json(orders) 
    
        // return res.json(_newID)
    })
    // console.log(idOrder);
    // orderDetails.save((err, orderDetails) => {
    //     if (err) res.send(err)
    //     res.json(orderDetails)
    // })
    
}