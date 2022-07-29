import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  converCurences,
  getAProduct,
  getColorsProduct,
  getSizesProduct,
} from "../../config/config";
import { useCart } from "../../context/Cartcontext";

const ProductDetail = () => {
  const { sanphamid } = useParams();
  const [infoProduct, setInfoProduct] = useState();
  const [infoSize, setInfoSize] = useState();
  const [infoColor, setInfoColor] = useState();
  const [indexColor, setIndexColor] = useState(null);
  const [indexSize, setIndexSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const {addToCartFromDetail} = useCart();

  const [dataProduct, setDataProduct] = useState(infoProduct);

  // console.log(quantity);

  useEffect(() => {
    getAProduct(sanphamid).then((data) => {
      setInfoProduct(data);
      setDataProduct({...data ,  quantity:1});
    });
    getSizesProduct(sanphamid).then((data) => {
      setInfoSize(data);
    });
    getColorsProduct(sanphamid).then((data) => {
      setInfoColor(data);
    });
  }, [sanphamid]);

  useEffect(() => {
    setDataProduct({...dataProduct, quantity: quantity})
    // console.log({...dataProduct, quantity: quantity});
  },[quantity])
  const handleChooseSize = (e) => {
    setDataProduct({...dataProduct,size:e.target.closest('.product-option').dataset.value})
  };
  const handleChooseColor = (e) => {
    setDataProduct({ ...dataProduct, color: e.target.closest(".product-option").dataset.value })
  };

  const handleChangeQuantity = (e) => {
    // setQuantity(e.target.value)
    // setDataProduct({...dataProduct, quantity: quantity});
  }
  return (
    <div className="">
      {infoProduct && (
        <div className="grid grid-cols-5 product-detail gap-x-10">
          <div className="col-start-1 col-end-4 rounded-xl product-detail-img">
            <img
              src={`/images/${infoProduct.images}`}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="inline-block col-start-4 col-end-6 product-detail-info">
            <div className="sticky top-5">
              <h1 className="mb-5 text-3xl font-bold">{infoProduct.name}</h1>
              <div className="flex font-semibold pro-price gap-x-3 mb-7">
                <span>
                  {converCurences(infoProduct.unitPromotionalPrice) + `đ`}
                </span>
                <del className="text-[#ccc]">
                  {converCurences(infoProduct.unitPrice)}
                </del>
                <span className="text-red-400">
                  {"-" +
                    Math.round(
                      ((infoProduct.unitPrice -
                        infoProduct.unitPromotionalPrice) /
                        infoProduct.unitPrice) *
                        100
                    ) +
                    "%"}
                </span>
              </div>
              <div>
                <div className="flex flex-col mb-3">
                  <div className="mb-2 option-heading">
                    <span className="font-semibold">Mô tả :</span>
                  </div>
                  <div>
                    <p>"{infoProduct.description}"</p>
                  </div>
                </div>
              </div>
              <div className="pro-color">
                <div className="mb-2 option-heading">
                  <span className="font-semibold">Màu sắc :</span>
                </div>
                <div className="flex flex-wrap items-center option-select-color gap-x-5">
                  {infoColor &&
                    infoColor.length > 0 &&
                    infoColor.map((item, index) => {
                      return (
                        <div
                          className={`px-4 py-2 mb-2 border border-gray-600 rounded-lg cursor-pointer product-color product-option ${
                            index === indexColor
                              ? " border-2 border-blue-400"
                              : ""
                          }`}
                          key={index.toString()}
                          data-value={item}
                          onClick={(e) => {
                            setIndexColor(index);
                            handleChooseColor(e)
                            // handleChooseSize(e);
                          }}
                          style={{
                            backgroundColor:item
                          }}
                        >
                          <span>{item}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="pro-size">
                <div className="mb-2 option-heading">
                  <span className="font-semibold">Kích thước:</span>
                </div>
                <div className="flex flex-wrap items-center option-select-color gap-x-5">
                  {infoSize &&
                    infoSize.length > 0 &&
                    infoSize.map((item, index) => {
                      return (
                        <div
                          className={`mb-2 h-[43px] flex items-center justify-center font-bold  cursor-pointer rounded-2xl transition-all px-6 product-size product-option ${
                            index === indexSize
                              ? "bg-black text-white"
                              : "text-black bg-[#ccc]"
                          }`}
                          key={index.toString()}
                          data-value={item}
                          onClick={(e) => {
                            setIndexSize(index);
                            handleChooseSize(e);
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flex items-center mt-5 gap-x-5 wrap-quantity-addToCart">
                <div className="flex items-center justify-between quantity">
                  <div className="w-[100px] h-[40px] inline-flex items-center border border-gray-200 rounded-3xl">
                    <button
                      type="button"
                      aria-label="Decrement value"
                      className="w-[33px] flex items-center justify-center"
                      onClick={() => {
                        if (quantity === 1) return;
                        setQuantity((prev) => prev - 1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <input
                      // value={quantity}
                      // defaultValue={1}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(+e.target.value)
                        // handleChangeQuantity(e)
                      }}
                      className="w-[33px] outline-none border-none h-full text-center font-semibold"
                    ></input>
                    <button
                      aria-label="Increment value"
                      type="button"
                      className="w-[33px] flex items-center justify-center"
                      onClick={() => {
                        setQuantity((prev) => prev + 1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  className="flex-1 btn-add-to-cart"
                  onClick={
                    () => {
                      // Ấn đặt hàng
                      console.log(dataProduct)
                      addToCartFromDetail(dataProduct, indexSize, indexColor)
                    }
                  }
                >
                  <button className="flex items-center justify-center w-full py-2 font-semibold text-white transition-all bg-black rounded-2xl hover:bg-slate-300 hover:text-black gap-x-3" >
                    <span className="w-6 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </span>
                    <span>Đặt Hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
