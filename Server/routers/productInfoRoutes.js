const express = require("express");
const productInfoBuilder = require("../controllers/productInfoController");

const router = express.Router();

router.get(
  "/?product=:productID&?size=:size&?color=:color",
  productInfoBuilder.get_a_proInfo
);
router.get(
  "/?product=:productID&?distinct=:distinct",
  productInfoBuilder.get_productInfo
);
router.post("/", productInfoBuilder.create_a_proInfo);

router.get("/moreInfo", productInfoBuilder.infoAggregate);

router.get(
  "/moreInfoOneProduct/:infoId",
  productInfoBuilder.infoAggregateAProduct
);

// lấy size sản phẩm theo màu chọn
router.get(
  "/getSizeFromColor/?id=:infoId&?color=:color",
  productInfoBuilder.getSizeFromColor
);

router.put(
  "/updateQuantity/?id=:infoId&?color=:color&?size=:size&?quantity=:quantity",
  productInfoBuilder.UpdateQuantity
)
module.exports = router;
