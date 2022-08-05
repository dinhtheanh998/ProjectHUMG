const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  // Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const heshPassword = await bcrypt.hash(req.body.password, salt);

      //   create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: heshPassword,
      });

      //  save user to database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      // "secret",
      { expiresIn: "30s" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      // "dinhtheanh",
      { expiresIn: "365d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Tài khoản không chính xác");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Mật khẩu không chính xác");
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = authController.generateAccessToken(user);
        //Generate refresh token
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        // STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};
module.exports = authController;
