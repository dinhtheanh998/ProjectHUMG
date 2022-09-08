const express = require("express");

const cors = require("cors");
var path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/db/connectdb");
require("./models/taskModel");
global.Categories = require("./models/categoryModel");
global.Product = require("./models/productModel");
global.ProductInfo = require("./models/productInfoModel");
global.returnRequest = require("./models/returnRequestModel");
global.exchangeRequest = require("./models/exchangeRequest");
global.ProductInfo = require("./models/productInfoModel");
global.Order = require("./models/OrderModel");
global.User = require("./models/userModel");
global.OrderDetails = require("./models/orderDetailsModel");
const routes = require("./routers");

// mongoose.set("useFindAndModify", false);
// mongoose.connect("mongodb://localhost/Vuecrudapp", { useNewUrlParser: true });

db.connect();
mongoose.Promise = global.Promise;

const port = 3001;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
