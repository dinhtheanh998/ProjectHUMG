const exchangeRequestController = require("../controllers/exchangeRequestController");
const router = require("express").Router();

router.get("/", exchangeRequestController.litsAllExchangeRequest);
router.post("/", exchangeRequestController.createAExchangeRequest);
router.put("/:id", exchangeRequestController.updateExchangeRequest);
router.delete("/:id", exchangeRequestController.deleteExchangeRequest);

module.exports = router;
