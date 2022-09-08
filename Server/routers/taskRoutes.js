const express = require("express");
const taskBuilder = require("../controllers/taskController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  //   verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const multer = require("multer");

const router = express.Router();
router.get("/", taskBuilder.list_all_tasks);
router.post("/", taskBuilder.uploadImage, taskBuilder.create_a_task);
// router.post("/", taskBuilder.uploadImage, taskBuilder.postFromExcel);
// // router.post("/", taskBuilder.create_a_task);
// router.get("/:taskId", taskBuilder.read_a_task);
// router.get("/cate/:cateId", taskBuilder.list_all_task_cate);
// router.put("/:taskId", taskBuilder.update_a_task);
// router.delete("/:taskId", verifyToken, taskBuilder.delete_a_task);

module.exports = router;
