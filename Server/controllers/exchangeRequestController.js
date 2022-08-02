const mongoose = require("mongoose");
const exchangeRequest = mongoose.model("exchangeRequest");

const exchangeRequestController = {
  litsAllExchangeRequest: (req, res) => {
    exchangeRequest.find({}, (err, exchangeRequests) => {
      if (err) res.send(err);
      res.json(exchangeRequests);
    });
  },
  createAExchangeRequest: (req, res) => {
    const newExchangeRequest = new exchangeRequest({
      ...req.body,
    });
    newExchangeRequest.save((err, exchangeRequests) => {
      if (err) res.send(err);
      res.json(exchangeRequests);
    });
  },
  updateExchangeRequest: (req, res) => {
    exchangeRequest.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      (err, exchangeRequests) => {
        if (err) res.send(err);
        res.json(exchangeRequests);
      }
    );
  },
  deleteExchangeRequest: (req, res) => {
    exchangeRequest.findByIdAndRemove(
      req.params.id,
      (err, exchangeRequests) => {
        if (err) res.send(err);
        res.json(exchangeRequests);
      }
    );
  },
};
module.exports = exchangeRequestController;
