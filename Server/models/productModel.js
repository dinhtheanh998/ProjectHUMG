const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    unitPromotionalPrice: {
      type: Number,
      required: true,
    },
    images: {
      type: [],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [],
      required: true,
    },
    // categories: {
    //   type: Schema.Types.ObjectId,
    //   ref: "category",
    //   required: false,
    // },
    suppliers: {
      type: Schema.Types.ObjectId,
      ref: "suppliers",
      required: false,
    },
  },
  { collection: "product" }
);

module.exports = mongoose.model("product", productSchema);
