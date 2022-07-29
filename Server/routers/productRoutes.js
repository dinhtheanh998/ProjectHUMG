const express = require("express");
const productBuilder = require("../controllers/productController");
const multer = require("multer");

const router = express.Router();
router.get("/", productBuilder.list_all_products);
router.post("/", productBuilder.uploadImage, productBuilder.create_a_product);
// router.post("/", productBuilder.create_a_task);
router.get("/:productId", productBuilder.read_a_product);
// router.get("/sum", productBuilder.sumQuantity);
router.get("/cate/:cateId", productBuilder.list_all_products_cate);
router.put("/:productId", productBuilder.update_a_product);
router.delete("/:productId", productBuilder.delete_a_product);
module.exports = router;
