const mongoose = require("mongoose");

const { Schema } = mongoose;

const productInfoSchema = new Schema(
  {
    productID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    }
  },
  { collection: "productInfo" }
);

module.exports = mongoose.model("productInfo", productInfoSchema);
