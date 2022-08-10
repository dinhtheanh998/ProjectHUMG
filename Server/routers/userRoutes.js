const userController = require("../controllers/userController");
const { verifyToken,verifyTokenAndUserAuthorization,verifyTokenAndAdmin } = require("../controllers/veryToken");

const router = require("express").Router();
router.get("/", verifyToken, userController.getAllUsers);
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  userController.deleteUser
);
module.exports = router;
