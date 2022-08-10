const express = require("express");
const cateBuilder = require("../controllers/categoryController");

const router = express.Router();
router.get("/", cateBuilder.list_all_cate);
router.post("/", cateBuilder.create_a_cate);
router.get("/:categoryId", cateBuilder.read_a_cate);
router.get("/getlimitCate/?limit=:limit", cateBuilder.getCateLimit);
router.put("/:categoryId", cateBuilder.update_a_cate);
router.delete("/:categoryId", cateBuilder.delete_a_cate);

module.exports = router;
