const cateRoutes = require("./cateRoutes");
const taskRoutes = require("./taskRoutes");
const productsRoutes = require("./productRoutes");
const productInfoRoutes = require("./productInfoRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const returnRequest = require("./returnRequestRoutes");
const exchangeRequest = require("./exchangeRequestRoutes");
const userRoutes = require("./userRoutes");
function routes(app) {
  app.use("/api/category", cateRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/productsInfo", productInfoRoutes);
  app.use("/api/order", orderRoutes);
  app.use ("/v1/user",userRoutes)
  app.use("/v1/auth", authRoutes);
  app.use("/api/returnRequest", returnRequest);
  app.use("/api/exchangeRequest", exchangeRequest);
}

module.exports = routes;
