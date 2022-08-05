const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const exchangeRequestSchema = new Schema(
  {
    OrderId: {
      type: String,
    },    
    phone: {
      type: String,
      required: true,
    },    
    productFromCustomer: {
      type: String,
      required: true,
    },
    productNew: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Chờ xử lý",
    },
  },
  { timestamps: true }
);

module.exports = mongooose.model("exchangeRequest", exchangeRequestSchema);
