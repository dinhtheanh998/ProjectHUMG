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
exports.get_productInfo2 = (req, res) => {
  console.log("productID", req.params.productID);
  productInfo
    .aggregate([
      {
        $match: { productID: new mongoose.Types.ObjectId(req.params.productID) },
      },
      {
        $group: {
          _id: "$productID",
          size: { $addToSet: "$size" },
          color: { $addToSet: "$color" },
        }
      }
    ],(err, proInfo) => { 
      if (err) res.send(err);
      res.json(proInfo);
    })
};

exports.get_a_proInfo = (req, res) => {
  productInfo.find(
    {
      productID: req.params.productID,
      size: req.params.size,
      color: `#${req.params.color}`,
    },
    (err, proInfo) => {
      if (err) res.send(err);
      const { quantity, ...other } = proInfo[0];
      res.json(quantity);
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

exports.getTotalQuantity = (req, res) => {
  // console.log(req.params.productID);
  productInfo.aggregate(
    [
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
      {
        $group: {
          _id: null,
          total: {
            $sum: "$quantity",
          },
        },
      },     
    ],

    (err, proInfo) => {
      if (err) res.send(err);
      res.json(proInfo);
    }
  );
};

exports.infoAggregateAProduct = (req, res) => {
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

exports.getSizeFromColor = (req, res) => {
  productInfo.aggregate(
    [
      {
        $match: {
          productID: new mongoose.Types.ObjectId(req.params.infoId),
          color: `#${req.params.color}`,
        },
      },
      {
        $group: {
          _id: "$productID",
          size: { $push: "$size" },
        },
      },
    ],
    (err, proInfo) => {
      if (err) res.send(err);
      res.json(proInfo);
    }
  );
};

exports.UpdateQuantity = (req, res) => {
  productInfo.updateOne(
    {
      productID: new mongoose.Types.ObjectId(req.params.infoId),
      color: `#${req.params.color}`,
      size: req.params.size,
    },
    { $inc: { quantity: -req.params.quantity } },
    (err, proInfo) => {
      if (err) res.send(err);
      console.log(proInfo);
      res.json(proInfo);
    }
  );
};

exports.updateProductInfo = (req, res) => {
  productInfo.findByIdAndUpdate(req.params.infoId, req.body, { new: true }, (err, proInfo) => {
    if (err) res.send(err);
    res.json(proInfo);
  })
};

exports.checkProductQuantity = (req, res) => { 
  productInfo.aggregate([
    {
      $match: {
        productID: new mongoose.Types.ObjectId(req.params.infoId),
        size: req.params.size,
        color: `#${req.params.color}`,
      }
    }
  ], (err, proInfo) => { 
    if (err) res.send(err);
    res.json(proInfo);
  })
}

exports.getInfobyId = (req, res) => { 
  productInfo.find({ _id: req.params.infoId }, (err, proInfo) => { 
    if (err) res.send(err);
    res.json(proInfo);
  })
}