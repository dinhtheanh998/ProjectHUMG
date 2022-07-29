const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const productInfo = mongoose.model("productInfo");

exports.create_a_proInfo = (req, res) => {
  const newProductInfo = new productInfo(req.body);
  newProductInfo.save((err, productInfo) => {
    if (err) res.send(err);
    res.json(productInfo);
  });
};

exports.get_productInfo = (req, res) => {
  productInfo
    .find({
      productID: req.params.productID,
      distinct: req.params.distinct,
    })
    .distinct(req.params.distinct, (err, proInfo) => {
      if (err) res.send(err);
      res.json(proInfo);
    });
};

exports.get_a_proInfo = (req, res) => {
  productInfo.find(
    {
      productID: req.params.productID,
      size: req.params.size,
      color: req.params.color,
    },
    (err, proInfo) => {
      if (err) res.send(err);
      res.json(proInfo);
    }
  );
};

exports.infoAggregate = (req, res) => {
  // console.log(req.params.productID);
  productInfo.aggregate(
    [
      {
        $group: {
          _id: "$productID",
          total: {
            $sum: "$quantity",
          },
          color: { $push: "$color" },
          // color2: {$addToSet:"$size" } ,
          size: { $addToSet: "$size" },
        },
      },
      {
        $lookup: {
          from: "product",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
    ],

    (err, proInfo) => {
      if (err) res.send(err);
      res.json(proInfo);
    }
  );
};

exports.infoAggregateAProduct = (req, res) => {
  // productInfo.find({productID: req.params.infoId},

  // [
  //   {
  //     $group: {
  //       _id: {
  //         productID: "$productID",
  //       },
  //       count: { $sum: 1 },
  //     },
  //   },
  // ],
  // [
  //   { $match: {_id : (req.params.infoId)}} ,
  //   // {
  //   //   // $group: {
  //   //   //   _id: "$productID",
  //   //   //   total: {
  //   //   //     $sum: "$quantity",
  //   //   //   },
  //   //   // },
  //   // },
  // ],
  productInfo.aggregate(
    [
      {
        $match: { productID: new mongoose.Types.ObjectId(req.params.infoId) },
      },
      {
        $lookup: {
          from: "product",
          localField: "productID",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
    ],
    (err, proInfo) => {
      if (err) res.send(err);
      res.json(proInfo);
    }
  );
};
