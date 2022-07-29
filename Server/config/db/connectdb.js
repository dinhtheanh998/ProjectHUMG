const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/OnineStore", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
