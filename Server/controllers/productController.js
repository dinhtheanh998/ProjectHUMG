const mongoose = require("mongoose");
const product = mongoose.model("product");
const multer = require("multer");
const XLSX = require("xlsx");
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    if (ext == "xlsx" || ext == "xls") {
      callback(null, "../client/public/excel");
    } else {
      callback(null, "../client/public/images/");
    }
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

exports.uploadImage = upload.array("images", 8);

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
        // {
        //   $lookup: {
        //     from: "category",
        //     localField: "categories",
        //     foreignField: "_id",
        //     as: "categories",
        //   },
        // },
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
  const imgArr = [];
  const cateArr = [];
  for (let i = 0; i < req.files.length; i++) {
    imgArr.push(req.files[i].filename);
  }
  if (typeof req.body.categories === "string") {
    req.body.categories = [req.body.categories];
  }
  // console.log(req.body.categories);
  for (let i = 0; i < req.body.categories.length; i++) {
    cateArr.push(JSON.parse(req.body.categories[i]));
  }
  console.log(cateArr);
  const newProduct = new product({
    name: req.body.name,
    unitPrice: req.body.unitPrice,
    unitPromotionalPrice: req.body.unitPromotionalPrice,
    images: imgArr,
    description: req.body.description,
    categories: cateArr,
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
      // {
      //   $lookup: {
      //     from: "category",
      //     localField: "categories",
      //     foreignField: "_id",
      //     as: "categories",
      //   },
      // },
      // {
      //   $unwind: "$categories",
      // },
      {
        $project: {
          _id: 1,
          name: 1,
          unitPrice: 1,
          unitPromotionalPrice: 1,
          images: 1,
          description: 1,
          categories: "$categories",
          // idCategories: "$categories._id",
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
  const imgArr = [];
  for (let i = 0; i < req.files.length; i++) {
    imgArr.push(req.files[i].filename);
  }
  const cateArr = [];
  if (typeof req.body.categories === "string") {
    req.body.categories = [req.body.categories];
  }
  for (let i = 0; i < req.body.categories.length; i++) {
    cateArr.push(JSON.parse(req.body.categories[i]));
  }
  // console.log(imgArr, cateArr);

  if (req.files.length > 0) {
    console.log([...imgArr, ...req.body.images]);
  } else {
    console.log(req.body.images);
  }

  product.findOneAndUpdate(
    { _id: req.params.productId },
    {
      name: req.body.name,
      unitPrice: req.body.unitPrice,
      unitPromotionalPrice: req.body.unitPromotionalPrice,
      images:
        req.files.length > 0
          ? [...imgArr, ...req.body.images]
          : req.body.images,
      description: req.body.description,
      categories: cateArr,
      suppliers: req.body.suppliers,
    },
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
  product.find(
    { name: { $regex: ".*" + findname + ".*", $options: "$gi" } },
    (err, products) => {
      if (err) res.send(err);
      res.json(products);
    }
  );
};

exports.getAllProductByPrice = (req, res) => {
  console.log("Get product by price");
  product
    .aggregate(
      [
        {
          $match: {
            unitPrice: { $gte: 0, $lte: +req.params.maxPrice },
          },
        },
        // {
        //   $lookup: {
        //     from: "category",
        //     localField: "categories",
        //     foreignField: "_id",
        //     as: "categories",
        //   },
        // },
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
    .sort({ unitPrice: -1 });
};

// config excel
const multerConfigEx = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/excel/");
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".")[1];
    callback(null, `excel-${Date.now()}.${ext}`);
  },
});

const uploadEx = multer({
  storage: multerConfigEx,
});
exports.uploadExcel = uploadEx.single("upFileExcel");
exports.postFromExcel = (req, res) => {
  console.log("Post from excel");
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  res.send(sheet_namelist);
  let x = 0;
  sheet_namelist.forEach((element) => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    console.log(element);
    console.log("xlData", xlData);
    product.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    x++;
  });
};

// update product by excel
exports.putFromExcel = (req, res) => {
  console.log("PUT from excel");
  let workbook = XLSX.readFile(req.file.path);
  let sheet_namelist = workbook.SheetNames;
  res.send(sheet_namelist);
  let x = 0;
  sheet_namelist.forEach((element) => {
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    for (let item of xlData) {
      product.findByIdAndUpdate(item._id, item, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      console.log(item);
    }
    // product.insertMany(xlData, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data);
    //   }
    // });
    // x++;
  });
};

exports.getInfoProduct = (req, res) => {
  product
    .aggregate(
      [
        {
          $match: { _id: mongoose.Types.ObjectId(req.params.id) },
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
          $unwind: "$productInfo",
        },
        {
          $group: {
            _id: {
              ID: "$_id",
              color: "$productInfo.color",
            },
            name: { $first: "$name" },
            unitPrice: { $first: "$unitPrice" },
            unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
            images: { $first: "$images" },
            categories: { $first: "$categories" },
            size: { $push: "$productInfo.size" },
            description: { $first: "$description" },
            quantity: { $push: "$productInfo.quantity" },
          },
        },
        {
          $lookup: {
            from: "productInfo",
            localField: "_id.ID",
            foreignField: "productID",
            as: "productInfo",
          },
        },

        // {
        //   $group: {
        //     _id: "$productInfo.size",
        //   }
        // }
      ],
      (err, data) => {
        if (err) res.send(err);
        res.json(data);
      }
    )
    .sort({ _id: 1 });
};

exports.getAllProductAndInfo = (req, res) => {
  product.aggregate(
    [
      {
        $lookup: {
          from: "productInfo",
          localField: "_id",
          foreignField: "productID",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $group: {
          _id: {
            ID: "$_id",
            color: "$productInfo.color",
          },
          name: { $first: "$name" },
          unitPrice: { $first: "$unitPrice" },
          unitPromotionalPrice: { $first: "$unitPromotionalPrice" },
          images: { $first: "$images" },
          categories: { $first: "$categories" },
          size: { $push: "$productInfo.size" },
        },
      },

      // {
      //   $group: {
      //     _id: "$productInfo.size",
      //   }
      // }
    ],
    (err, data) => {
      if (err) res.send(err);
      res.json(data);
    }
  );
};

exports.getProductByCategories = (req, res) => {
  let categories1 = req.query.categories1;
  let categories2 = req.query.categories2;
  product.aggregate(
    [
      // {
      //   $unwind: "$categories",
      // },
      {
        $project: {
          _id: 1,
          name: 1,
          cate: {
            $filter: {
              input: "$categories",
              as: "cate",
              cond: {
                $and: [{$eq: ["$$cate.value", categories1], $eq: ["$$cate.value", categories2]}],
              },
            }
          }
          
        },

      },
      
    ],
    (err, data) => {
      if (err) res.send(err);
      res.json(data);
    }
  );
  // res.json(product)
  // let result = product.filter(item => item.categories.value === categories)
  // res.json(result);
  // res.send("ok")
};
