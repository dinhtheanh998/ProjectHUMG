const User = require("../models/UserModel");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
