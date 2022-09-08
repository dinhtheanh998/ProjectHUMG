const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    task1: {
      type: String,
      required: "task1 cannot be blank",
    },
    task2: {
      type: String,
      required: "task2  cannot be blank",
    },    
    images: {
      type: [],
      require: true,
    },
    // categories: {
    //   type: Schema.Types.ObjectId,
    //   ref: "category",
    //   required: true,
    // },
  },
  { collection: "task" }
);

module.exports = mongoose.model("task", taskSchema);
