const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const returnRequestSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    OrderId: {
      type: Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountHolder: {
      type: String,
      required: true,
    },
    bankBranch: {
      type: String,
    },
    description: {
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

module.exports = mongooose.model("returnRequest", returnRequestSchema);
