import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCart } from "../../context/Cartcontext";
import axios from "axios";
import { converCurences } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ProductSleketon from "./ProductSleketon";

const Product = ({
  //
  data,
}) => {
  const [color, setColor] = useState();
  const [size, setSize] = React.useState([]);
  const [infoPro, setInfoPro] = useState();
  const proRef = useRef();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({
    ...data,
  });

  const { addToCart } = useCart();
  console.log("data",data)
  useEffect(() => {
    setLoading(true);
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios
      .get(`/api/products/getInfoProduct/${data._id}`)
      .then((res) => {
        if (!unmounted) {
          setInfoPro(res.data);
          setLoading(false);
        }
      }).catch((err) => { 
        if(!unmounted){
          setLoading(false);
        }
        if(axios.isCancel(err)){
          console.log("request canceled:"+ err.message);
        } else {
          console.log("another error:" + err.message);
        }
      })
      ;
    return () => {
      unmounted = true;
      source.cancel("cancel request");
    }
  }, [data._id]);
  console.log(infoPro)
  const handleGetInfo = (e) => {
    if (e.target.closest(".product-color")) {
      const index = +e.target.closest(".product-color").dataset.index;
      setActiveIndex(index);
      // setColor(e.target.closest(".product-color").dataset.color);
      // console.log(e.target.closest(".product-color").dataset.color);
      setProductData((prev) => ({        
        ...prev,
        color: e.target.closest(".product-color").dataset.color,
        quantity: 1,       
      }));
      setSize(infoPro[index].size);
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
      className="relative w-full p-2 overflow-hidden bg-white rounded-lg cursor-pointer product-wrap page-container hover:shadow-lg group"
      onClick={(e) => {
        // navigate(`/san-pham/${data._id}`);
        handleClickProduct(e);
      }}
      ref={proRef}
    >
      {loading && <ProductSleketon></ProductSleketon>}
      {!loading && (
        <>
          <div className="relative w-full mb-4 overflow-hidden rounded-lg group">
            <div className="w-full h-[350px]">
              <img
                src={`/images/${data.images[0]}`}
                alt=""
                className="object-cover w-full h-full transition duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-70"
              />
            </div>
            <div className="absolute bottom-0 flex flex-wrap items-center gap-2 px-3 py-3 text-white transition-all translate-y-full group-hover:visible group-hover:translate-y-0 pro-size">
              {size &&
                size.length > 0 &&
                size.map((size, i) => {
                  return (
                    <ProductSize
                      size={size}
                      key={uuidv4()}
                      addToCart={addToCart}
                      indexM = {i}
                      data={productData}
                      activeIndex={activeIndex}
                    ></ProductSize>
                  );
                })}
            </div>
          </div>
          <div className="flex items-center gap-x-3 pro-color">
            {infoPro &&
              infoPro.length > 0 &&
              infoPro.map((info, i) => {
                return (
                  <ProductColor
                    color={info._id.color}
                    key={i}
                    onClick={handleGetInfo}
                    index={i}
                    activeIndex={activeIndex}
                    dataSize = {info.size}
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
                  ((data.unitPrice - data.unitPromotionalPrice) /
                    data.unitPrice) *
                    100
                ) +
                "%"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const ProductSize = ({ size, addToCart, data, activeIndex , indexM }) => {
  console.log("ProductData", data);
  return (
    <label
      htmlFor="size"
      onClick={() => addToCart({
        ...data, size, 
      }, activeIndex)}
      className="z-10"
    >
      <input type="text" defaultValue={size} className="hidden" name="size" />
      <span className="w-[48px] h-[43px] flex items-center justify-center font-bold text-black bg-white cursor-pointer rounded-2xl hover:bg-black hover:text-white transition-all">
        {size}
      </span>
    </label>
  );
};

const ProductColor = ({ color, onClick, index, activeIndex, dataSize }) => {
 
  return (
    <div
      className={`px-4 py-2 mb-2 border  rounded-lg cursor-pointer product-color ${
        activeIndex === index ? " border-blue-500 border-2" : "border-gray-500"
      }`}
      data-color={color}
      onClick={onClick}
      data-index={index}
      data-size={dataSize}
      style={{
        backgroundColor: color,
      }}
    >
    </div>
  );
};

export default Product;
