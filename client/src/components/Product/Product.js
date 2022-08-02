import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCart } from "../../context/Cartcontext";
import axios from "axios";
import { converCurences } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Product = ({
  //
  data,
}) => {
  // const [infoSize, setInfoSize] = useState();
  const [color, setColor] = useState();
  const [infoSize2, setInfoSize2] = useState();
  const [infoColor, setInfoColor] = useState();
  const proRef = useRef();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [productData, setProductData] = useState({
    ...data,
  });

  const { addToCart } = useCart();
  useEffect(() => {
    axios
      .get(`/api/productsInfo/product=${data._id}&distinct=color`)
      .then((res) => {
        setInfoColor(res.data);
      });
  }, [data._id]);

  useEffect(() => {
    axios
      .get(
        `/api/productsInfo/getSizeFromColor/id=${data._id}&color=${color?.slice(
          1
        )}`
      )
      .then((res) => {
        setInfoSize2(res?.data[0]?.size);
      });
  }, [color, data._id]);
  const handleGetInfo = (e) => {
    if (e.target.closest(".product-color")) {
      const index = +e.target.closest(".product-color").dataset.index;
      setActiveIndex(index);
      setColor(e.target.closest(".product-color").dataset.color);
      // console.log(e.target.closest(".product-color").dataset.color);
      setProductData((prev) => ({
        ...prev,
        color: e.target.closest(".product-color").dataset.color,
        quantity: 1,
      }));
    }
  };

  const handleClickProduct = (e) => {
    if (
      !proRef.current.contains(e.target.closest(".pro-size")) &&
      !proRef.current.contains(e.target.closest(".pro-color"))
    )
      navigate(`/san-pham/${data._id}`);
  };

  return (
    <div
      className="relative p-2 overflow-hidden bg-white rounded-lg cursor-pointer product-wrap"
      onClick={(e) => {
        // navigate(`/san-pham/${data._id}`);
        handleClickProduct(e);
      }}
      ref={proRef}
    >
      <div className="relative w-full mb-4 overflow-hidden rounded-lg group">
        <img
          src={`/images/${data.images}`}
          alt=""
          className="w-full h-[350px] object-cover"
        />

        <div className="absolute bottom-0 flex flex-wrap items-center gap-2 px-3 py-3 text-white transition-all translate-y-full group-hover:visible group-hover:translate-y-0 pro-size">
          {infoSize2 &&
            infoSize2.length > 0 &&
            infoSize2.map((size, i) => {
              return (
                <ProductSize
                  size={size}
                  key={uuidv4()}
                  addToCart={addToCart}
                  data={productData}
                  activeIndex={activeIndex}
                ></ProductSize>
              );
            })}
        </div>
      </div>
      <div className="flex items-center gap-x-3 pro-color">
        {infoColor &&
          infoColor.length > 0 &&
          infoColor.map((color, i) => {
            return (
              <ProductColor
                color={color}
                key={i}
                onClick={handleGetInfo}
                index={i}
                activeIndex={activeIndex}
              ></ProductColor>
            );
          })}
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

const ProductSize = ({ size, addToCart, data, activeIndex }) => {
  return (
    <label
      htmlFor="size"
      onClick={() => addToCart({ ...data, size }, activeIndex)}
      className="z-10"
    >
      <input type="text" defaultValue={size} className="hidden" name="size" />
      <span className="w-[48px] h-[43px] flex items-center justify-center font-bold text-black bg-white cursor-pointer rounded-2xl hover:bg-black hover:text-white transition-all">
        {size}
      </span>
    </label>
  );
};

const ProductColor = ({ color, onClick, index, activeIndex }) => {
  return (
    <div
      className={`px-4 py-2 mb-2 border border-gray-100 rounded-lg cursor-pointer product-color ${
        activeIndex === index ? " border-blue-500 border-2" : ""
      }`}
      data-color={color}
      onClick={onClick}
      data-index={index}
      style={{
        backgroundColor: color,
      }}
    >
      {/* <span className="font-semibold ">{color}</span> */}
    </div>
  );
};

export default Product;
