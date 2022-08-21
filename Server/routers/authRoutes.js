// const authController = require("../controllers/authController");

// const router = require("express").Router();

// router.post("/register", authController.registerUser);
// router.post("/login", authController.loginUser);
// router.post("/logout", authController.logOut);
// router.post("/refresh", authController.requestRefreshToken);
// module.exports = router;
const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);
//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", authController.logOut);
module.exports = router;
