const cateRoutes = require("./cateRoutes");
const taskRoutes = require("./taskRoutes");
const productsRoutes = require("./productRoutes");
const productInfoRoutes = require("./productInfoRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
function routes(app) {
  app.use("/api/category", cateRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/productsInfo", productInfoRoutes);
  app.use("/api/order", orderRoutes);
  app.use("/api/auth", authRoutes);
}

module.exports = routes;
