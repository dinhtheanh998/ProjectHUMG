const mongoose = require("mongoose");
const returnRequest = mongoose.model("returnRequest");

const returnRequestController = {
  litsAllReturnRequest: (req, res) => {
    returnRequest.find({}, (err, returnRequests) => {
      if (err) res.send(err);
      res.json(returnRequests);
    });
  },
  createAReturnRequest: (req, res) => {
    const newReturnRequest = new returnRequest({
      ...req.body,
    });
    newReturnRequest.save((err, returnRequests) => {
      if (err) res.send(err);
      res.json(returnRequests);
    });
  },
  updateReturnRequest: (req, res) => {
    console.log(req.params);
    returnRequest.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      (err, returnRequests) => {
        if (err) res.send(err);
        res.json(returnRequests);
      }
    );
  },
  deleteReturnRequest: (req, res) => {
    returnRequest.findByIdAndRemove(req.params.id, (err, returnRequests) => {
      if (err) res.send(err);
      res.json(returnRequests);
    });
  },
};

module.exports = returnRequestController;
