const mongoose = require("mongoose");
const { Schema } = mongoose;

const cateSchema = new Schema(
  {
    name: {
      type: String,
      required: "Tên loại không được để trống",
    },
  },
  { collection: "category" }
);
module.exports = mongoose.model("category", cateSchema);
