import React from "react";
import { useNavigate } from "react-router-dom";
import { converCurences } from "../../../config/config";

const ProductPageItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full p-2 overflow-hidden bg-white rounded-lg cursor-pointer product-wrap page-container hover:shadow-md"
      onClick={(e) => {
        navigate(`/san-pham/${data._id}`);
        // handleClickProduct(e);
      }}
    >
      <div className="relative w-full mb-4 overflow-hidden rounded-lg group">
        <img
          src={`/images/${data.images[0]}`}
          alt=""
          className="w-full h-[350px] object-cover"
        />
      </div>
      <h3 className="font-semibold text-black">{data.name}</h3>
      <div className="flex items-center gap-x-3">
        <span className="text-sm font-semibold new-product-price text-primary">
          {converCurences(data.unitPromotionalPrice) + `đ`}
        </span>
        <span className="text-sm font-semibold text-gray-600 line-through old-product-price">
          {converCurences(data.unitPrice) + `đ`}
        </span>
        <span className="text-sm font-semibold text-red-500 product-discount">
          {"-" +
            Math.round(
              ((data.unitPrice - data.unitPromotionalPrice) / data.unitPrice) *
                100
            ) +
            "%"}
        </span>
      </div>
    </div>
  );
};

export default ProductPageItem;
