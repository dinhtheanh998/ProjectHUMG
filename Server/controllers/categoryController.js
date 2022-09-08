const mongoose = require("mongoose");
const category = mongoose.model("category");
exports.list_all_cate = (req, res) => {
  category.find({}, (err, categories) => {
    if (err) res.send(err);
    res.json(categories);
  });
};

exports.create_a_cate = (req, res) => {
  const newCate = new category(req.body);
  newCate.save((err, category) => {
    if (err) res.send(err);
    res.json(category);
  });
};

exports.read_a_cate = (req, res) => {
  category.findById(req.params.categoryId, (err, category) => {
    if (err) res.send(err);
    res.json(category);
  });
};

exports.update_a_cate = (req, res) => {
  category.findByIdAndUpdate(
    { _id: req.params.categoryId },
    req.body,
    { new: true },
    (err, category) => {
      if (err) res.send(err);
      res.json(category);
    }
  );
};

exports.delete_a_cate = (req, res) => {
  category.deleteOne({ _id: req.params.categoryId }, (err) => {
    if (err) res.send(err);
    res.json({
      messages: "Xóa thành công",
      _id: req.params.categoryId,
    });
  });
};

exports.getCateLimit = (req, res) => { 
  category.find({}).limit(req.params.limit).sort({_id: -1}).exec((err, categories) => {
    if (err) res.send(err);
    res.json(categories);
  });
}