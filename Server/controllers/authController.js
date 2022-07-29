const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
};
module.exports = authController;
