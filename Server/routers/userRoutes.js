const userController = require("../controllers/userController");
const { verifyToken,verifyTokenAndUserAuthorization,verifyTokenAndAdmin } = require("../controllers/verifyToken");

const router = require("express").Router();
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/update/:userId", userController.uploadImage, userController.updateUser);
router.put("/updateFromAdmin/:userId", userController.updateUserFromAdmin);
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  userController.deleteUser
);
router.get("/get/UserandOrder", userController.getAllUserAndOrder);
module.exports = router;
