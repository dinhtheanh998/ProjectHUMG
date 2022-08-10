const authController = require("../controllers/authController");
const { verifyToken,verifyTokenAndUserAuthorization,verifyTokenAndAdmin } = require("../controllers/veryToken");
const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logOut);
router.post("/refresh", authController.requestRefreshToken);
module.exports = router;
