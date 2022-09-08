import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  converCurences,
  notifyWarn,
} from "../../config/config";
import { useCart } from "../../context/Cartcontext";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";



const ProductDetail = () => {
  const [activeThumb, setActiveThumb] = useState();
  const { sanphamid } = useParams();
  const [infoProduct, setInfoProduct] = useState();
  const [size, setSize] = useState();
  const [indexColor, setIndexColor] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const {addToCartFromDetail} = useCart();
  const [maxQuantity, setMaxQuantity] = useState();
  const [dataProduct, setDataProduct] = useState(infoProduct);
  const inputRef = useRef();
  // console.log(quantity);x

  useEffect(() => {
    // setLoading(true);
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios
      .get(`/api/products/getInfoProduct/${sanphamid}`)
      .then((res) => {
        if (!unmounted) {
          setInfoProduct(res.data);
          setDataProduct({ ...res.data, quantity: 1 });
          setSize(res.data[0].size);
          setDataProduct({ ...res.data[0], _id: res.data[0]._id.ID, quantity: quantity, color: res.data[0]._id.color, size: res.data[0].size[indexSize] });
          setMaxQuantity(res.data[indexColor].quantity[indexSize])
          // setLoading(false);
        }
      }).catch((err) => { 
        if(!unmounted){
          // setLoading(false);
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
    // getAProduct(sanphamid).then((data) => {
    //   setInfoProduct(data);
    //   setDataProduct({...data ,  quantity:1});
    // });
    // getSizesProduct(sanphamid).then((data) => {
    //   setInfoSize(data);
    // });
    // getColorsProduct(sanphamid).then((data) => {
    //   setInfoColor(data);
    // });
  }, [sanphamid]);
  // useEffect(() => {
  //   setDataProduct({...dataProduct, quantity: quantity});
  //   // console.log({...dataProduct, quantity: quantity});
  // },[quantity])
  // console.log(maxQuantity)
  console.log(infoProduct);
  const handleChooseSize = (e) => {
    setDataProduct({ ...dataProduct, size: e.target.closest('.product-option').dataset.value,maxQuantity:infoProduct[indexColor].quantity[indexSize] })
    setMaxQuantity(infoProduct[indexColor].quantity[indexSize])
  };
  const handleChooseColor = (e,index) => {
    setDataProduct({ ...dataProduct, color: e.target.closest(".product-option").dataset.value })
    setIndexSize(null)
    setSize(infoProduct[index]?.size);
    setMaxQuantity(infoProduct[indexColor].quantity[indexSize])
  };

  const handleAddToCart = async (dataProduct, indexSize, indexColor) => {
    console.log(dataProduct);
    console.log(dataProduct)
    // console.log(`/api/productsInfo/checkProductQuantity/id=${dataProduct._id || dataProduct[0]._id.ID }&color=${dataProduct[0]?._id.color.slice(1)}&size=${dataProduct.size}`)

    if (indexSize === null || indexColor === null) { 
      console.log("indexSize", indexSize);      
      notifyWarn("Chọn kích thước sản phẩm")
    } else {
      // console.log(dataProduct.color.slice(1));      
      // const info = await axios.get(`/api/productsInfo/checkProductQuantity/id=${dataProduct._id}&color=${dataProduct.color.slice(1)}&size=${dataProduct.size}`)
      const info = await axios.get(`/api/productsInfo/checkProductQuantity/id=${dataProduct._id }&color=${dataProduct.color.slice(1)}&size=${dataProduct.size}`)
      console.log(info)
      if (info.data.length === 0) {
        notifyWarn("Sản phẩm đã hết hàng")
      }

      if (info.data.length > 0 || info.data[0].quantity > 0) {
        console.log("Có thể thêm vào giỏ");
        addToCartFromDetail(dataProduct, indexSize, indexColor);
      }
    }
  }
  return (
    <div className="page-container">
      {infoProduct && (
        <div className="grid grid-cols-5 product-detail gap-x-10">
          <div className="relative col-start-1 col-end-4 rounded-xl product-detail-img">
            {/* <img
              src={`/images/${infoProduct[0]?.images}`}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            /> */}
            <Swiper
            loop={true}
            spaceBetween={10}
            // navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{
              swiper:
                activeThumb && !activeThumb.destroyed ? activeThumb : null,
            }}
            // thumbs={{ swiper: activeThumb }}
            className="relative product-images-slider"
          >
            {infoProduct &&
              infoProduct[0]?.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/images/${item}`}
                    alt="product images"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <Swiper
            onSwiper={setActiveThumb}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className="absolute top-3 product-images-slider-thumbs w-[150px] left-3"
          >
            {infoProduct &&
              infoProduct[0]?.images.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="product-images-slider-thumbs-wrapper">
                    <img
                      src={`/images/${item}`}
                      alt="product images"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          </div>
          <div className="inline-block col-start-4 col-end-6 product-detail-info">
            <div className="sticky top-5">
              <h1 className="mb-5 text-3xl font-bold">{infoProduct[0].name}</h1>
              <div className="flex font-semibold pro-price gap-x-3 mb-7">
                <span>
                  {converCurences(infoProduct[0].unitPromotionalPrice) + `đ`}
                </span>
                <del className="text-[#ccc]">
                  {converCurences(infoProduct[0].unitPrice)}
                </del>
                <span className="text-red-400">
                  {"-" +
                    Math.round(
                      ((infoProduct[0].unitPrice -
                        infoProduct[0].unitPromotionalPrice) /
                        infoProduct[0].unitPrice) *
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
                    <p>"{infoProduct[0].description}"</p>
                  </div>
                </div>
              </div>
              <div className="pro-color">
                <div className="mb-2 option-heading">
                  <span className="font-semibold">Màu sắc :</span>
                </div>
                <div className="flex flex-wrap items-center option-select-color gap-x-5">
                  {infoProduct &&
                    infoProduct.length > 0 &&
                    infoProduct.map((item, index) => {
                      return (
                        <div
                          className={`px-5 py-3 mb-2 border border-gray-600 rounded-lg cursor-pointer product-color product-option ${
                            index === indexColor
                              ? " border-2 border-blue-400"
                              : ""
                          }`}
                          key={index.toString()}
                          data-value={item?._id.color}
                          onClick={(e) => {
                            setIndexColor(index);
                            handleChooseColor(e,index)
                            // handleChooseSize(e);
                          }}
                          style={{
                            backgroundColor:item?._id.color
                          }}
                        >
                          <span></span>
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
                  {size &&
                    size.length > 0 &&
                    size.map((item, index) => {
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
                      ref={inputRef}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(prev => +e.target.value)
                        if (+e.target.value > infoProduct[indexColor].quantity[indexSize]) {
                          setQuantity(infoProduct[indexColor].quantity[indexSize])
                          console.log("Qua so luong")
                        }
                        // handleChangeQuantity(e)
                      }}
                      className="w-[33px] outline-none border-none h-full text-center font-semibold"
                    ></input>
                    <button
                      aria-label="Increment value"
                      type="button"
                      className={`w-[33px] flex items-center justify-center ${+inputRef.current?.value >= infoProduct[indexColor]?.quantity[indexSize] ? "cursor-not-allowed" : ""}`}
                      onClick={() => {
                        setQuantity((prev) => prev + 1);
                        if (+inputRef.current.value >= infoProduct[indexColor]?.quantity[indexSize]) {
                          setQuantity(infoProduct[indexColor]?.quantity[indexSize])
                          
                        }
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
                      handleAddToCart(dataProduct, indexSize, indexColor)
                     
                    }
                  }
                >
                  <button className="flex items-center justify-center w-full py-2 font-semibold text-white transition-all duration-300 bg-black rounded-2xl hover:bg-slate hover:text-black gap-x-3" >
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
