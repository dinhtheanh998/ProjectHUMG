const mongoose = require("mongoose");
const multer = require("multer");
const task = mongoose.model("task");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../public/");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `image-${Date.now()}.${ext}`);
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

// exports.uploadAImage = upload.single("image");
exports.uploadImage = upload.array('images', 8)

exports.list_all_tasks = (req, res) => {
  task.find({}, (err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = (req, res, next) => {
  console.log("upload multiple images", req.files);
  const imgArr = [];
  for (let i = 0; i < req.files.length; i++) {
    imgArr.push(req.files[i].filename);
  }
  const newTask = new task({
    task1: req.body.task1,
    task2: req.body.task2,
    images: imgArr,
    categories: req.body.categories,
  });
  newTask.save((err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.read_a_task = (req, res) => {
  task.findById(req.params.taskId, (err, task) => {
    if (err) res.send(err);
    res.json(task);
  });
};
// lấy theo thể loại
exports.list_all_task_cate = (req, res) => {
  task
    .find({ categories: req.params.cateId })
    .populate("categories")
    .exec((err, task) => {
      if (err) res.send(err);
      res.json(task);
    });
};

exports.update_a_task = (req, res) => {
  task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    (err, task) => {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = (req, res) => {
  task.deleteOne({ _id: req.params.taskId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "task successfully deleted",
      _id: req.params.taskId,
    });
  });
};
