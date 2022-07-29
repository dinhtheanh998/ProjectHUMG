const mongoose = require("mongoose");
const product = mongoose.model("product");
const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/images/");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `image-${Date.now()}.${ext}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Vui lòng chỉ tải lên hình ảnh"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

exports.uploadImage = upload.single("images");

exports.list_all_products = (req, res) => {
  product.find({}, (err, products) => {
    if (err) res.send(err);
    res.json(products);
  });
};

exports.create_a_product = (req, res) => {
  console.log(req.file);
  const newProduct = new product({
    name: req.body.name,
    unitPrice: req.body.unitPrice,
    unitPromotionalPrice: req.body.unitPromotionalPrice,
    images: req.file.filename,
    description: req.body.description,
    categories: req.body.categories,
    suppliers: req.body.suppliers,
  });
  newProduct.save((err, product) => {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.read_a_product = (req, res) => {
  product.findById(req.params.productId, (err, product) => {
    if (err) res.send(err);
    res.json(product);
  });
};
// lấy theo thể loại
exports.list_all_products_cate = (req, res) => {
  product
    .find({ categories: req.params.cateId })
    .populate("categories")
    .exec((err, product) => {
      if (err) res.send(err);
      res.json(product);
    });
};

exports.update_a_product = (req, res) => {
  product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true },
    (err, product) => {
      if (err) res.send(err);
      res.json(product);
    }
  );
};

exports.delete_a_product = (req, res) => {
  product.deleteOne({ _id: req.params.productId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "product successfully deleted",
      _id: req.params.productId,
    });
  });
};

// exports.sumQuantity = (req, res) => {
//   product.aggregate(
//     [
//       {
//         $lookup: {
//           from: "productInfo",
//           localField: "_id",
//           foreignField: "productID",
//           as: "copies_sold",
//         },
//       },
//       // {
//       //   $group: {
//       //     _id: "$productID",
//       //     size: { $push: "$size" },
//       //     color: { $push: "$color" },
//       //     total: { $sum: "$quantity" },
//       //   },
//       // },
//     ],

//     (err, proInfo) => {
//       if (err) res.send(err);
//       res.json(proInfo);
//     }
//   );
// };
