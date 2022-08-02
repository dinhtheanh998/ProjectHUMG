const returnRequestController = require("../controllers/returnRequestController");
const router = require("express").Router();

router.get("/", returnRequestController.litsAllReturnRequest);
router.post("/", returnRequestController.createAReturnRequest);
router.put("/:id", returnRequestController.updateReturnRequest);
router.delete("/:id", returnRequestController.deleteReturnRequest);

module.exports = router;
