const User = require("../models/userModel");
const multer = require("multer");
const bcrypt = require("bcrypt");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/avatarUser/");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `avatar-${Date.now()}.${ext}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Vui lòng chỉ tải lên hình ảnh"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

const userController = {
  uploadImage: upload.single("avatar"),

  getOneUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  },
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
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công");
    } catch (error) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    console.log(req.params);
    try {
      if (req.file && req.body.password) {
        console.log("Update avatar & password");
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              avatar: req.file.filename,
              email: req.body.email,
              password: hashed,
            },
          },
          (err, user) => {
            if (err) res.send(err);
            res.json(user);
          }
        );
        return;
      } else if (req.file && !req.body.password) {
        console.log("Update avatar");
        console.log(req.file.filename);
        User.findByIdAndUpdate(
          req.params.userId,
          { $set: { avatar: req.file.filename, email: req.body.email } },
          (err, user) => {
            if (err) res.send(err);
            res.json(user);
          }
        );
        return;
      } else if (!req.file && req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        console.log("Update password");
        User.findByIdAndUpdate(
          req.params.userId,
          { $set: { password: hashed, email: req.body.email } },
          (err, user) => {
            if (err) res.send(err);
            res.json(user);
          }
        );
        return;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllUserAndOrder: async (req, res) => {
    console.log("User and order");
    try {
      const user = await User.aggregate([
        // {
        //   $project: {
        //     _id: 1,
        //     username: 1,
        //     email: 1,
        //     isAdmin: 1,
        //     avatar: 1,
        //     createdAt: 1,
        //   },
        // },
        {
          $lookup: {
            from: "orders",
            localField: "username",
            foreignField: "userName",
            as: "orders",
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            isAdmin: 1,
            avatar: 1,
            createdAt: 1,
            countOrder: {
              $filter: {
                input: "$orders",
                as: "order",
                cond: { $eq: ["$$order.state", "Thành công"] },
              },
            },            
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            isAdmin: 1,
            avatar: 1,
            createdAt: 1,
            countOrder: { $size: "$countOrder" },
          }
        },
        {$limit:4}
      ]).sort({ countOrder: -1 });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(err);
    }
  },
  updateUserFromAdmin: async (req, res) => { 
    try {
      if (req.body.password) {
        console.log("Update password");
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        User.findByIdAndUpdate(
          req.params.userId,
          { $set: { password: hashed, isAdmin: req.body.isAdmin } },
          (err, user) => {
            if (err) res.send(err);
            res.json(user);
          }
        );
        return;
      } else {
        console.log("Update isAdmin");
        User.findByIdAndUpdate(
          req.params.userId,
          { $set: {isAdmin: req.body.isAdmin } },
          (err, user) => {
            if (err) res.send(err);
            res.json(user);
          }
        );
        return;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
