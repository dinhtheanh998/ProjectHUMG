const mongoose = require("mongoose");
const product = mongoose.model("product");
const multer = require("multer");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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

exports.getAllProduct = (req, res) => {
  product
    .aggregate(
      [
        {
          $lookup: {
            from: "category",
            localField: "categories",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $lookup: {
            from: "productInfo",
            localField: "_id",
            foreignField: "productID",
            as: "productInfo",
          },
        },
        {
          $unwind: "$categories",
        },
        {
          $unwind: "$productInfo",
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            unitPrice: { $first: "$unitPrice" },
            unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
            images: { $first: "$images" },
            categories: { $first: "$categories" },
            productInfo: { $push: "$productInfo" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            unitPrice: 1,
            unitPromotionalPrice: 1,
            images: 1,
            categories: 1,
            productInfo: 1,
          },
        },
      ],
      (err, products) => {
        if (err) res.send(err);
        res.json(products);
      }
    )
    .sort({ name: 1 });
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

exports.getAProduct = (req, res) => {
  product.aggregate(
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.productId),
        },
      },
      {
        $lookup: {
          from: "category",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          unitPrice: 1,
          unitPromotionalPrice: 1,
          images: 1,
          description: 1,
          categories: "$categories.name",
          idCategories: "$categories._id",
        },
      },
    ],
    (err, product) => {
      if (err) res.send(err);
      res.json(...product);
    }
  );
};

// lấy theo thể loại
exports.list_all_products_cate = (req, res) => {
  product.aggregate(
    [
      {
        $match: {
          categories: mongoose.Types.ObjectId(req.params.cateId),
        },

      },
      {
        $lookup: {
          from: "category",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        }
      },
      {
        $lookup: {
          from: "productInfo",
          localField: "_id",
          foreignField: "productID",
          as: "productInfo",
        }
      },
      {
        $unwind: "$categories",
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          unitPrice: { $first: "$unitPrice" },
          unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
          images: { $first: "$images" },
          categories: { $first: "$categories" },
          productInfo: { $push: "$productInfo" },
        },
      },
      
    ],
    (err, product) => {
      if (err) res.send(err);
      res.json(product);
    }
  );
};

exports.update_a_product = (req, res) => {
  if (req.file) {
    product.findOneAndUpdate(
      { _id: req.params.productId },
      {
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        unitPromotionalPrice: req.body.unitPromotionalPrice,
        images: req.file.filename,
        description: req.body.description,
        categories: req.body.categories,
        suppliers: req.body.suppliers,
      },
      { new: true },
      (err, product) => {
        if (err) res.send(err);
        res.json(product);
      }
    );
  } else {
    product.findOneAndUpdate(
      { _id: req.params.productId },
      {
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        unitPromotionalPrice: req.body.unitPromotionalPrice,
        description: req.body.description,
        categories: req.body.categories,
        suppliers: req.body.suppliers,
      },
      { new: true },
      (err, product) => {
        if (err) res.send(err);
        res.json(product);
      }
    );
  }
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

exports.findProductByQuery = (req, res) => {
  // console.log(req.params.query);
  // if (
  //   req.params.query == "" ||
  //   req.params.query == undefined ||
  //   req.params.query == null
  // ) {
  //   product
  //     .aggregate(
  //       [
  //         {
  //           $lookup: {
  //             from: "category",
  //             localField: "categories",
  //             foreignField: "_id",
  //             as: "categories",
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "productInfo",
  //             localField: "_id",
  //             foreignField: "productID",
  //             as: "productInfo",
  //           },
  //         },
  //         {
  //           $unwind: "$categories",
  //         },
  //         {
  //           $unwind: "$productInfo",
  //         },
  //         {
  //           $group: {
  //             _id: "$_id",
  //             name: { $first: "$name" },
  //             unitPrice: { $first: "$unitPrice" },
  //             unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
  //             images: { $first: "$images" },
  //             categories: { $first: "$categories" },
  //             productInfo: { $push: "$productInfo" },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 1,
  //             name: 1,
  //             unitPrice: 1,
  //             unitPromotionalPrice: 1,
  //             images: 1,
  //             categories: 1,
  //             productInfo: 1,
  //           },
  //         },
  //       ],
  //       (err, products) => {
  //         if (err) res.send(err);
  //         res.json(products);
  //       }
  //     )
  //     .sort({ name: 1 });
  // } else {
  //   product
  //     .aggregate(
  //       [
  //         {
  //           $match: { name: new RegExp(req.params.query, "i") },
  //         },
  //         {
  //           $lookup: {
  //             from: "category",
  //             localField: "categories",
  //             foreignField: "_id",
  //             as: "categories",
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "productInfo",
  //             localField: "_id",
  //             foreignField: "productID",
  //             as: "productInfo",
  //           },
  //         },
  //         {
  //           $unwind: "$categories",
  //         },
  //         {
  //           $unwind: "$productInfo",
  //         },
  //         {
  //           $group: {
  //             _id: "$_id",
  //             name: { $first: "$name" },
  //             unitPrice: { $first: "$unitPrice" },
  //             unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
  //             images: { $first: "$images" },
  //             categories: { $first: "$categories" },
  //             productInfo: { $push: "$productInfo" },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 1,
  //             name: 1,
  //             unitPrice: 1,
  //             unitPromotionalPrice: 1,
  //             images: 1,
  //             categories: 1,
  //             productInfo: 1,
  //           },
  //         },
  //       ],
  //       (err, products) => {
  //         if (err) res.send(err);
  //         res.json(products);
  //       }
  //     )
  //     .sort({ name: 1 });
  // }

  const findname = req.params.query;
  product.find({ name: { $regex:'.*'+findname+'.*',$options:"$gi"} }, (err, products) => {
    if (err) res.send(err);
    res.json(products);
  });
};

exports.getAllProductByPrice = (req, res) => { 
  console.log("Get product by price");
  product.aggregate([
    {
      $match: {
        unitPrice: { $gte: 0 ,$lte: + req.params.maxPrice },
      }
    },
    {
      $lookup: {
        from: "category",
        localField: "categories",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "productInfo",
        localField: "_id",
        foreignField: "productID",
        as: "productInfo",
      },
    },
    {
      $unwind: "$categories",
    },
    {
      $unwind: "$productInfo",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        unitPrice: { $first: "$unitPrice" },
        unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
        images: { $first: "$images" },
        categories: { $first: "$categories" },
        productInfo: { $push: "$productInfo" },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        unitPrice: 1,
        unitPromotionalPrice: 1,
        images: 1,
        categories: 1,
        productInfo: 1,
      },
    },
    
  ], (err, products) => { 
    if (err) res.send(err);
    res.json(products);
  }).sort({ unitPrice: -1 });
}
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
