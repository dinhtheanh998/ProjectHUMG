import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { converCurences } from "../../config/config";
import { useCart } from "../../context/Cartcontext";
import InputForm from "../customForm/InputForm";
import CartItems from "./CartItems";
import { v4 as uuidv4 } from "uuid";
import SkeletonCartItem from "./SkeletonCartItem";

const schema = yup.object().shape({
  fullName: yup.string().required("Họ vàn tên không được để trống"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Vui lòng nhập đúng số điện thoại"
    ),
  email: yup
    .string()
    .required("Email không được bỏ trống")
    .email("Vui lòng nhập đúng email"),
  address: yup
    .string()
    .required(
      "Hãy điền đúng địa chỉ để shop có thể giao hàng đến bạn nhanh nhất nhé"
    ),
});

const Cart = () => {
  const {
    cartItems,
    removeToCart,
    setCartItems,
    setValueCart,
    updateQuantityDecrement,
    updateQuantityIncrement,
    totalPrice,
    handleQuantityChange,
    clearCart,
  } = useCart();
  const [info, setInfo] = useState();
  const [infoSize, setInfoSize] = useState();
  const [infoColor, setInfoColor] = useState();
  const [submitData, setSubmitData] = useState();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.login.currentUser);
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onBlur",
  });
  let result = cartItems.reduce((unique, o) => {
    if (!unique.some((obj) => obj.label === o.label && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
  }, []);

  useEffect(() => {
    setLoading(true);
    let unmounted = false;
    let source = axios.CancelToken.source();
    /*
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
    */
    result.forEach((item) => {
      // axios
      //   .get(`/api/productsInfo/product=${item._id}&distinct=size`)
      //   .then((res) => {
      //     if (!unmounted) {
      //       setInfoSize(res.data);
      //       setLoading(false);
      //     }
      //   }).catch((err) => {
      //     if(!unmounted){
      //       setLoading(false);
      //     }
      //     if(axios.isCancel(err)){
      //       console.log("request canceled:"+ err.message);
      //     } else {
      //       console.log("another error:" + err.message);
      //     }
      //   });
      axios
        .get(`/api/productsInfo/v1/${item._id}`)
        .then((res) => {
          if (!unmounted) {
            setInfo(res.data[0]);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!unmounted) {
            setLoading(false);
          }
          if (axios.isCancel(err)) {
            console.log("request canceled:" + err.message);
          } else {
            console.log("another error:" + err.message);
          }
        });
    });
    // result.forEach((item) => {
    //   axios
    //     .get(`/api/productsInfo/product=${item._id}&distinct=color`)
    //     .then((res) => {
    //       setInfoColor(res.data);
    //     });
    // });
    // eslint-disable-nextLine react-hooks/exhaustive-deps
    return () => {
      unmounted = true;
      source.cancel("Canceled in cleanup");
    };
  }, [reload]);
  const handleSubmitOrder = (data) => {
    if (user && cartItems.length !== 0) {
      data = {
        ...data,
        total: totalPrice(),
        details: cartItems,
        userName: user.username,
      };
      axios.post("/api/order", data).then((res) => {
        if (res.status === 200) {
          clearCart();
        }
        setSubmitData(res.data);
      });
      return;
    }
    if (cartItems.length === 0) {
      setError("cart", { type: "custom", message: "Giỏ hàng đang trống" });
    } else {
      data = { ...data, total: totalPrice(), details: cartItems };
      axios.post("/api/order", data).then((res) => {
        if (res.status === 200) {
          clearCart();
        }
        setSubmitData(res.data);
      });
    }
  };
  return (
    <>
      {!submitData && (
        <form
          className="page-container"
          onSubmit={handleSubmit(handleSubmitOrder)}
        >
          <div className="grid grid-cols-2 gap-10">
            <div className="wrap-info-customer">
              <div className="grid w-full grid-cols-2 gap-x-5">
                <div className="flex flex-col mb-5 gap-y-3">
                  {/* <label htmlFor="fullName" className="font-semibold">
                Tên người nhận
              </label> */}
                  <InputForm
                    id="fullName"
                    name="fullName"
                    placeholder="Nhập tên người nhận"
                    control={control}
                    className="font-semibold rounded-2xl"
                  ></InputForm>
                  <p className="text-sm text-red-500">
                    {errors.fullName?.message}
                  </p>
                </div>
                <div className="flex flex-col mb-5 gap-y-3">
                  {/* <label htmlFor="phone" className="font-semibold">
                Số điện thoại
              </label> */}
                  <InputForm
                    id="phone"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    control={control}
                    className="font-semibold rounded-2xl"
                    type="tel"
                    maxLength="10"
                  ></InputForm>
                  <p className="text-sm text-red-500">
                    {errors.phone?.message}
                  </p>
                </div>
              </div>
              <div className="flex flex-col mb-5 gap-y-3">
                {/* <label htmlFor="email" className="font-semibold">
              Email
            </label> */}
                <InputForm
                  id="email"
                  name="email"
                  placeholder="Email"
                  control={control}
                  className="font-semibold rounded-2xl"
                  type="email"
                ></InputForm>
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              </div>
              <div className="flex flex-col mb-5 gap-y-3">
                {/* <label htmlFor="address" className="font-semibold">
              Địa chỉ
            </label> */}
                <InputForm
                  id="address"
                  name="address"
                  placeholder="Địa chỉ"
                  control={control}
                  className="font-semibold rounded-2xl"
                  type="text"
                ></InputForm>
                <p className="text-sm text-red-500">
                  {errors.address?.message}
                </p>
              </div>
              <div className="flex justify-center mb-5 gap-y-3 gap-x-5">
                {/* <label htmlFor="address" className="font-semibold">
              Địa chỉ
            </label> */}
                <div className="flex items-center gap-x-3">
                  <input
                    id="ShipCOD"
                    {...register("paymentMethods")}
                    value="Ship COD"
                    placeholder=""
                    // control={control}
                    className="font-semibold rounded-2xl"
                    type="radio"
                  ></input>
                  <label htmlFor="ShipCOD">Ship COD</label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="internetBanking"
                    {...register("paymentMethods")}
                    value="Internet Banking"
                    placeholder=""
                    control={control}
                    className="font-semibold rounded-2xl"
                    type="radio"
                  ></input>
                  <label htmlFor="internetBanking">Internet Banking</label>
                </div>
                <p className="text-sm text-red-500">
                  {errors.address?.message}
                </p>
              </div>
              <div className="w-full mx-auto">
                <button className="w-full py-3 font-semibold text-white transition-all bg-black rounded-2xl hover:bg-[#d9d9d9] hover:text-black">
                  Đặt Hàng
                </button>
              </div>
            </div>
            {cartItems.length > 0 && (
              <div>
                <div className="max-h-[600px] overflow-y-auto overflow-x-hidden scrollbar">
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((item, index) => {
                      return (
                        <React.Fragment key={uuidv4()}>
                          {loading && <SkeletonCartItem></SkeletonCartItem>}
                          {!loading && (
                            <CartItems
                              data={item}
                              size={infoSize}
                              color={infoColor}
                              info={info}
                              key={uuidv4()}
                              control={control}
                              setValue={setValue}
                              index={index}
                              removeToCart={removeToCart}
                              setCartItems={setCartItems}
                              setValueCart={setValueCart}
                              cartItems={cartItems}
                              updateQuantityIncrement={updateQuantityIncrement}
                              updateQuantityDecrement={updateQuantityDecrement}
                              handleQuantityChange={handleQuantityChange}
                              reload={reload}
                              setReload={setReload}
                            ></CartItems>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>
                <div className="w-full font-semibold text-right border-t mt-7 border-slate-400">
                  <span>Tổng: </span>
                  <strong className="text-red-400">
                    {converCurences(totalPrice()) + `đ`}
                  </strong>
                </div>
              </div>
            )}
            {cartItems.length <= 0 && (
              <div>
                <div className="max-h-[600px] overflow-y-auto overflow-x-hidden scrollbar">
                  <span className="w-full h-[260px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 501.23 423.1"
                      className="w-full h-[260px]"
                    >
                      <g data-name="Layer 2">
                        <g data-name="Layer 1">
                          <ellipse
                            cx="456.21"
                            cy="326.63"
                            fill="none"
                            stroke="#ffcd52"
                            strokeMiterlimit="10"
                            rx="19.68"
                            ry="34.1"
                          />
                          <path
                            fill="#ffcd52"
                            d="M439.33 341.63c-2.8-6.46-.69-10.42-.69-15 0-9.63 3.23-20.53 9-27.37a52.83 52.83 0 0 1 2.45 15.13c-.03 9.61-5.02 20.4-10.76 27.24Z"
                          />
                          <ellipse
                            cx="425.93"
                            cy="314.46"
                            fill="#fff"
                            rx="19.68"
                            ry="34.1"
                          />
                          <path
                            fill="#ffcd52"
                            d="M474.25 327.7c0 3.81 1.54 6.85-.56 12-9.05-7.21-15.84-19.32-15.84-31.79a55.47 55.47 0 0 1 1.91-13c9.04 7.15 14.49 20.32 14.49 32.79Z"
                          />
                          <ellipse
                            cx="481.05"
                            cy="305.95"
                            fill="#fff"
                            rx="19.68"
                            ry="34.1"
                          />
                          <path
                            fill="none"
                            stroke="#ffcd52"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M456.21 360.73v-51.14M456.21 329.62l7.97-9.11M456.21 340.5l11.49-13.13M456.21 351.72l11.86-13.57M456.21 329.65l-9.66-11.06M456.21 340.52l-11.86-13.56M456.21 351.74l-11.86-13.56"
                          />
                          <ellipse
                            cx="481.05"
                            cy="305.95"
                            fill="none"
                            stroke="#008ef8"
                            strokeMiterlimit="10"
                            rx="19.68"
                            ry="34.1"
                          />
                          <path
                            fill="none"
                            stroke="#008ef8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M481.05 288.91V360.87M481.05 308.94l9.64-11.03M481.05 319.82l11.86-13.56M481.05 331.03l11.86-13.56M481.05 308.96l-9.67-11.05M481.05 319.84l-11.86-13.56M481.05 331.06l-11.86-13.57"
                          />
                          <ellipse
                            cx="425.93"
                            cy="314.46"
                            fill="none"
                            stroke="#ff5061"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            rx="19.68"
                            ry="34.1"
                          />
                          <path
                            fill="none"
                            stroke="#ff5061"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M425.93 297.42v63.45M425.93 317.45l9.65-11.03M425.93 328.33l11.86-13.56M425.93 339.54l11.86-13.56M425.93 317.47l-9.66-11.05M425.93 328.35l-11.86-13.56M425.93 339.56 414.07 326"
                          />
                          <path
                            fill="none"
                            stroke="#545454"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M25.26 360.87h467.65"
                          />
                          <rect
                            width="97.06"
                            height="98.1"
                            x="42.68"
                            y="182.7"
                            fill="#c1e3f7"
                            rx="13"
                            transform="rotate(45 91.215 231.752)"
                          />
                          <rect
                            width="114.32"
                            height="114.32"
                            x="34.05"
                            y="174.59"
                            fill="none"
                            stroke="#008ef8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            rx="13"
                            transform="rotate(45 91.215 231.752)"
                          />
                          <path
                            fill="#439916"
                            d="M31.34 313.3a78.74 78.74 0 0 1 1.21 7.89c.3 2.63.48 5.27.64 7.91s.23 5.29.21 7.95a79 79 0 0 1-.35 8 78.74 78.74 0 0 1-1.21-7.89c-.3-2.63-.48-5.28-.64-7.92s-.22-5.29-.21-7.94.08-5.3.35-8Z"
                          />
                          <path
                            fill="#439916"
                            d="M48.06 328.3a79.18 79.18 0 0 1-7.89 1.21c-2.64.3-5.28.48-7.92.65s-5.29.22-7.94.2a76 76 0 0 1-8-.35 75.92 75.92 0 0 1 7.89-1.2c2.63-.3 5.27-.49 7.91-.65s5.29-.22 7.94-.2a79 79 0 0 1 8.01.34Z"
                          />
                          <path
                            fill="#0850ec"
                            d="M103.71 277.21a36.56 36.56 0 0 1 1.06 5.3c.25 1.77.42 3.55.51 5.33s.12 3.56.07 5.35a36.35 36.35 0 0 1-.49 5.38 38 38 0 0 1-1.07-5.3c-.24-1.77-.41-3.54-.5-5.32s-.12-3.57-.07-5.36a36.47 36.47 0 0 1 .49-5.38Z"
                          />
                          <path
                            fill="#0850ec"
                            d="M115 287.32a36.16 36.16 0 0 1-5.29 1.06c-1.78.24-3.55.42-5.33.51s-3.56.12-5.35.07a36.35 36.35 0 0 1-5.38-.49 34.93 34.93 0 0 1 5.29-1.07c1.78-.24 3.55-.42 5.33-.51s3.56-.11 5.35-.06a36.35 36.35 0 0 1 5.38.49Z"
                          />
                          <path
                            fill="#439916"
                            d="M175.25 0c.55 2.62.91 5.25 1.2 7.89s.49 5.27.65 7.92.22 5.29.21 7.94a79 79 0 0 1-.36 8c-.55-2.62-.91-5.25-1.2-7.89s-.49-5.27-.65-7.92-.22-5.29-.2-7.94a79 79 0 0 1 .35-8Z"
                          />
                          <path
                            fill="#439916"
                            d="M192 15c-2.62.55-5.25.91-7.89 1.2s-5.27.49-7.92.65-5.29.22-7.94.21a79 79 0 0 1-8-.36c2.62-.55 5.25-.91 7.89-1.2s5.27-.49 7.92-.65 5.29-.22 7.94-.2a76.13 76.13 0 0 1 8 .35ZM196.18 19.44a36.56 36.56 0 0 1 1.06 5.3c.24 1.77.42 3.55.51 5.33s.12 3.56.07 5.35a36.47 36.47 0 0 1-.49 5.38 36.6 36.6 0 0 1-1.07-5.3c-.24-1.77-.42-3.55-.51-5.33s-.11-3.56-.06-5.35a36.35 36.35 0 0 1 .49-5.38Z"
                          />
                          <path
                            fill="#439916"
                            d="M207.43 29.54a37.7 37.7 0 0 1-5.3 1.07c-1.77.24-3.54.41-5.32.51s-3.57.11-5.35.07a36.63 36.63 0 0 1-5.39-.5 36.56 36.56 0 0 1 5.3-1.06c1.77-.24 3.55-.42 5.33-.51s3.56-.11 5.35-.06a37.73 37.73 0 0 1 5.38.48ZM10.1 299.21a37.57 37.57 0 0 1 1.07 5.29c.24 1.78.41 3.55.51 5.33s.11 3.56.07 5.35a37.77 37.77 0 0 1-.5 5.38 36.16 36.16 0 0 1-1.06-5.29c-.24-1.78-.42-3.55-.51-5.33s-.12-3.57-.07-5.35a39.26 39.26 0 0 1 .49-5.38Z"
                          />
                          <path
                            fill="#439916"
                            d="M21.36 309.31a36.56 36.56 0 0 1-5.3 1.06c-1.77.25-3.55.42-5.33.51s-3.56.12-5.35.07a36.35 36.35 0 0 1-5.38-.49 38 38 0 0 1 5.3-1.07c1.77-.24 3.54-.41 5.32-.5s3.57-.12 5.36-.07a36.6 36.6 0 0 1 5.38.49ZM448.55 163.66a78.74 78.74 0 0 1 1.21 7.89c.3 2.63.48 5.27.65 7.92s.22 5.29.2 7.94a79 79 0 0 1-.35 8 75.92 75.92 0 0 1-1.2-7.89c-.31-2.63-.49-5.27-.65-7.92s-.22-5.29-.21-7.94.08-5.33.35-8Z"
                          />
                          <path
                            fill="#439916"
                            d="M465.27 178.67c-2.62.55-5.26.91-7.89 1.2s-5.28.49-7.92.65-5.29.22-7.94.21a78.84 78.84 0 0 1-8-.36c2.62-.55 5.25-.91 7.89-1.2s5.27-.49 7.91-.65 5.29-.22 7.95-.2a76.13 76.13 0 0 1 8 .35ZM437.53 145.33a37.57 37.57 0 0 1 1.07 5.29c.24 1.77.41 3.55.51 5.33s.11 3.56.06 5.35a36.35 36.35 0 0 1-.49 5.38 36.43 36.43 0 0 1-1.06-5.29c-.24-1.78-.42-3.55-.51-5.33s-.12-3.57-.07-5.35a39.26 39.26 0 0 1 .49-5.38Z"
                          />
                          <path
                            fill="#439916"
                            d="M448.79 155.43a36.56 36.56 0 0 1-5.3 1.06c-1.77.24-3.55.42-5.33.51s-3.56.12-5.35.07a36.35 36.35 0 0 1-5.38-.49 36.6 36.6 0 0 1 5.3-1.07c1.77-.24 3.54-.41 5.32-.5s3.57-.12 5.36-.07a36.6 36.6 0 0 1 5.38.49Z"
                          />
                          <path
                            fill="#d86c1d"
                            d="m245.69 203.17-141.41 53.41 117.25 58.3 153.12-58.3-128.96-53.41z"
                          />
                          <path
                            fill="#f46534"
                            d="m245.69 203.17-24.16 111.71 153.12-58.3-128.96-53.41z"
                          />
                          <path
                            fill="#ffcd52"
                            d="m245.69 203.29 128.96 53.29 41.73 1.3-127.5-57.3-43.19 2.71zM66.84 238.93l139.85-49.73 39 13.97-141.41 53.41-37.44-17.65z"
                          />
                          <path
                            fill="#008ef8"
                            d="M279.87 198.9a51.75 51.75 0 0 1-3.64 15c-2.4 5.8-4.8 8.42-5.92 14.11a24.74 24.74 0 0 0 0 10.92c.81 3.33 2.32 6.13 7.29 12.29 5.7 7.08 7.64 8.27 11.38 12.75 3.6 4.33 6.24 9.16 11.37 18.66 6.68 12.35 10 18.53 10.47 20.94 3.37 17.87-19.64 36.29-23.21 39.14-27.95 22.37-68.53 23.11-98.32 11.38a88.07 88.07 0 0 1-32.77-21.39c-18.39-19.32-22.09-41.87-23.67-52.35-1.22-8.16-5.52-39.71 11.84-69.18 17.63-29.93 40.15-28.09 47.79-55.08 5.82-20.55-2.13-39.69 2.27-41 4.66-1.35 9.45 21.23 31 32.77 6.7 3.59 8.55 2.64 18.09 7.79 12.81 6.92 15.41 11.84 24.24 17.7 20.4 13.53 39 8.79 40 14.56.59 3.18-4.25 8.83-30.95 19.57Z"
                          />
                          <path
                            fill="#ffcd52"
                            d="m221.53 314.88-2.72 108.22-114.53-62.74V256.58l117.25 58.3z"
                          />
                          <path
                            fill="#ffd26e"
                            d="m221.53 314.88-2.72 108.22 149.6-50.3 6.24-116.22-153.12 58.3z"
                          />
                          <path
                            fill="#008ef8"
                            d="M291.25 286.29c-.82-7.4 5.8-9.81 13.66-23.21 5.57-9.51 8.29-18.63 11.83-30.5 4.26-14.28 3.64-17.89 8.19-22.3 5.75-5.58 16-8.82 23.67-5 9.68 4.82 10.53 18.65 10.93 25 1.5 24.49-15.13 42.74-21.4 49.62-7.37 8.08-22 24.1-35 20-5.86-1.77-11.2-7.5-11.88-13.61Z"
                          />
                          <path
                            fill="#fff"
                            d="m209.91 159.13 21.73 8.49s-3.46 19.52-15.38 15.95-6.35-24.44-6.35-24.44Z"
                          />
                          <path
                            fill="none"
                            stroke="#63717c"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m209.91 159.13 21.73 8.49s-3.46 19.52-15.38 15.95-6.35-24.44-6.35-24.44Z"
                          />
                          <path
                            fill="#63717c"
                            d="M220.77 163.37s-9 15-4.51 20.2c0 0 7.31-5.64 4.51-20.2Z"
                          />
                          <path
                            fill="#fff"
                            d="m239.54 171 16 14.32s-9.27 15.74-18.41 8.82 2.41-23.14 2.41-23.14Z"
                          />
                          <path
                            fill="none"
                            stroke="#63717c"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m239.54 171 16 14.32s-9.27 15.74-18.41 8.82 2.41-23.14 2.41-23.14Z"
                          />
                          <path
                            fill="#63717c"
                            d="M247.55 178.14s-12.54 10-10.4 16c0-.02 8.13-2.53 10.4-16Z"
                          />
                          <path
                            fill="#0234c1"
                            d="M206.39 183.39a28.64 28.64 0 0 0-2.78-3 32.8 32.8 0 0 0-3.1-2.67 33.14 33.14 0 0 0-7-4.15 32.79 32.79 0 0 0-7.77-2.37 45.5 45.5 0 0 0-8.19-.67q1-.12 2.07-.21a18 18 0 0 1 2.07-.14 32.31 32.31 0 0 1 4.17.26 27.62 27.62 0 0 1 8 2.22 28 28 0 0 1 7.07 4.46 24.85 24.85 0 0 1 5.46 6.27ZM199.71 186.42a33.34 33.34 0 0 0-7.34-3.12 38.4 38.4 0 0 0-7.79-1.48c-.66-.1-1.33-.07-2-.12a18.68 18.68 0 0 0-2 0h-2l-2 .19a58.37 58.37 0 0 0-7.88 1.47c1.26-.48 2.52-1 3.81-1.36a38.48 38.48 0 0 1 4-.87 32 32 0 0 1 8.12-.34 30.81 30.81 0 0 1 8 1.75 32.47 32.47 0 0 1 3.72 1.63 21.89 21.89 0 0 1 3.36 2.25ZM196.07 191c-1.15 0-2.3-.05-3.45 0s-2.29 0-3.43.1a57.26 57.26 0 0 0-6.8.76 35.22 35.22 0 0 0-6.55 1.77c-.54.19-1 .46-1.55.69-.26.12-.52.23-.77.37l-.73.44a20.53 20.53 0 0 0-2.81 2 16.33 16.33 0 0 1 2.54-2.37l.71-.52c.24-.16.51-.29.76-.44.51-.27 1-.6 1.54-.84a27.12 27.12 0 0 1 6.69-2.05 39.92 39.92 0 0 1 13.85.15ZM241.21 199.61a25.15 25.15 0 0 1 8.29.45 27.64 27.64 0 0 1 7.84 2.9 27.19 27.19 0 0 1 6.67 5 30.21 30.21 0 0 1 2.73 3.15 15.35 15.35 0 0 1 1.16 1.73c.37.58.74 1.17 1.09 1.76a46.33 46.33 0 0 0-5.51-6.09 33.72 33.72 0 0 0-6.61-4.72 33.37 33.37 0 0 0-7.55-3 31.93 31.93 0 0 0-4-.84 29.74 29.74 0 0 0-4.11-.34ZM242.87 206.76a22.18 22.18 0 0 1 3.82 1.33 34.18 34.18 0 0 1 3.56 2 31.21 31.21 0 0 1 6.22 5.25 32.43 32.43 0 0 1 4.68 6.65 38.36 38.36 0 0 1 1.71 3.68c.48 1.26.86 2.56 1.25 3.84a59.79 59.79 0 0 0-3.63-7.14l-1.06-1.68-1.17-1.69a18.34 18.34 0 0 0-1.22-1.57c-.44-.49-.82-1-1.3-1.5a38.53 38.53 0 0 0-5.91-5.28 33.71 33.71 0 0 0-6.95-3.89ZM241.47 212.42a39.85 39.85 0 0 1 8.55 10.9 27.1 27.1 0 0 1 2.44 6.56c.14.56.18 1.15.27 1.73 0 .29.1.58.12.87v.88a16 16 0 0 1-.33 3.46 21.72 21.72 0 0 0-.15-3.43l-.09-.84c0-.28-.12-.56-.18-.84-.14-.55-.22-1.11-.4-1.65a35 35 0 0 0-2.58-6.28 58.23 58.23 0 0 0-3.53-5.85c-.64-1-1.31-1.87-2-2.79s-1.39-1.82-2.12-2.72Z"
                          />
                          <path
                            fill="#d8821d"
                            d="M221.34 322.63 260.95 369l110.31-45.88 2.99-58.74-152.72 50.5-.19 7.75zM180.64 351.59l40.7-28.99.19-7.72-117.25-50.71v41.03l76.36 46.39z"
                          />
                          <path
                            fill="#ffccd8"
                            d="m199.94 143.33-.7-15.72 9.42 13.69s-4.42-3.14-8.72 2.03ZM281.59 191l15.7-1-13.54 9.64s3.07-4.46-2.16-8.64Z"
                          />
                          <path
                            fill="#ffcd52"
                            d="M180.64 344 74.69 279.64l29.59-23.06 117.25 58.3L180.64 344zM405.6 301.19l-144.44 60.08-39.63-46.39 153.12-58.3 30.95 44.61z"
                          />
                          <path
                            fill="#d8821d"
                            d="M104.28 312a39.23 39.23 0 0 1 5.1-4.3 37.76 37.76 0 0 1 5.68-3.49 38.57 38.57 0 0 1-5.1 4.3 39.47 39.47 0 0 1-5.68 3.49ZM104.28 320.53a101.56 101.56 0 0 1 8.32-6.63 99.3 99.3 0 0 1 8.9-5.82 97.72 97.72 0 0 1-8.31 6.63 99.46 99.46 0 0 1-8.91 5.82ZM104.27 330.07c1.93-1.54 3.92-3 5.93-4.4s4-2.81 6.08-4.18 4.11-2.7 6.21-4l3.15-1.92c1.07-.62 2.12-1.25 3.2-1.84-1 .77-2 1.49-2.93 2.24l-3 2.16c-2 1.43-4 2.81-6.08 4.17s-4.11 2.7-6.21 4-4.19 2.58-6.35 3.77ZM104.28 343.21c2.81-2.18 5.69-4.28 8.58-6.37s5.8-4.12 8.72-6.15 5.88-4 8.86-6l4.48-2.91c1.51-.94 3-1.91 4.53-2.83-1.4 1.11-2.84 2.16-4.25 3.23l-4.32 3.15c-2.88 2.09-5.8 4.12-8.73 6.15s-5.88 4-8.86 6-5.96 3.89-9.01 5.73ZM104.27 356.1c3.65-2.76 7.36-5.42 11.08-8.08s7.49-5.23 11.24-7.85 7.55-5.14 11.36-7.66l5.73-3.76c1.93-1.23 3.85-2.48 5.79-3.68-1.82 1.39-3.67 2.72-5.51 4.08l-5.57 4c-3.72 2.66-7.49 5.24-11.24 7.86s-7.55 5.14-11.37 7.66-7.63 5.01-11.51 7.43ZM112.89 364.81c3.74-2.81 7.55-5.54 11.36-8.26s7.68-5.35 11.51-8 7.74-5.26 11.64-7.84l5.87-3.86c2-1.26 3.93-2.54 5.92-3.77-1.86 1.42-3.76 2.78-5.65 4.17l-5.7 4.09c-3.82 2.71-7.68 5.36-11.51 8s-7.74 5.27-11.65 7.85-7.81 5.15-11.79 7.62ZM124.41 371.35c3.74-2.82 7.54-5.55 11.36-8.26s7.67-5.36 11.51-8 7.73-5.27 11.64-7.85l5.86-3.86c2-1.25 3.94-2.54 5.93-3.77-1.87 1.42-3.77 2.79-5.65 4.18l-5.71 4.09c-3.81 2.71-7.67 5.35-11.51 8s-7.74 5.27-11.64 7.85-7.82 5.14-11.79 7.62ZM136 377.51c3.74-2.82 7.55-5.55 11.36-8.26s7.68-5.36 11.51-8 7.74-5.27 11.64-7.85l5.87-3.86c2-1.26 3.93-2.54 5.92-3.77-1.86 1.42-3.76 2.78-5.64 4.17L171 354c-3.82 2.71-7.68 5.36-11.51 8s-7.74 5.27-11.65 7.85S140 375 136 377.51ZM147.56 383.37c6-4.37 12.05-8.64 18.11-12.9l18.27-12.68 18.4-12.49 9.25-6.17 9.3-6.09-9 6.49-9.08 6.41-18.27 12.67-18.4 12.49c-6.14 4.13-12.35 8.24-18.58 12.27ZM220.74 346c-5.16 3.79-10.38 7.49-15.61 11.18s-10.52 7.31-15.77 11-10.58 7.22-15.9 10.78l-8 5.31c-2.68 1.75-5.35 3.52-8.05 5.24 2.57-1.91 5.19-3.76 7.78-5.64l7.83-5.55c5.24-3.69 10.52-7.31 15.77-11s10.58-7.22 15.9-10.77 10.66-7.1 16.05-10.55ZM220.4 359.8c-4.22 3.15-8.5 6.2-12.78 9.24s-8.63 6-12.94 9-8.68 5.96-13.06 8.84l-6.62 4.35c-2.22 1.41-4.41 2.86-6.64 4.25 2.1-1.58 4.24-3.1 6.36-4.66l6.42-4.57c4.29-3 8.62-6 12.94-9s8.68-5.92 13.06-8.82 8.86-5.82 13.26-8.63ZM220 374.68c-3.2 2.45-6.46 4.8-9.72 7.14s-6.59 4.62-9.88 6.93-6.65 4.52-10 6.73l-5 3.29c-1.71 1.07-3.39 2.17-5.11 3.21 1.59-1.23 3.22-2.41 4.83-3.61l4.89-3.53c3.27-2.34 6.58-4.61 9.88-6.92s6.64-4.52 10-6.73 6.7-4.4 10.11-6.51ZM219.67 389c-2.22 1.77-4.51 3.46-6.8 5.13s-4.61 3.29-6.94 4.9-4.69 3.19-7.08 4.72l-3.58 2.25c-1.22.73-2.41 1.49-3.65 2.2 1.11-.89 2.25-1.73 3.37-2.6l3.43-2.52c2.28-1.68 4.61-3.3 6.94-4.91s4.69-3.19 7.08-4.72 4.77-3.06 7.23-4.45ZM219.31 403.1a98.81 98.81 0 0 1-16.43 11.27 87.36 87.36 0 0 1 7.93-6.05 88.74 88.74 0 0 1 8.5-5.22ZM219 414.75a15.58 15.58 0 0 1-3.15 2.77 15.77 15.77 0 0 1-3.71 1.94 17.54 17.54 0 0 1 6.86-4.71Z"
                          />
                          <path
                            fill="#0234c1"
                            d="M212.79 209.08a11.58 11.58 0 0 1 1.34-4.33 13.39 13.39 0 0 1 2.68-3.64 27.46 27.46 0 0 1-1.79 4.1 43.32 43.32 0 0 1-2.23 3.87Z"
                          />
                          <path
                            fill="#ffccd8"
                            d="m214.58 188.13 14.11 7.76s-17.31 17.26-14.11-7.76Z"
                          />
                          <path
                            fill="none"
                            stroke="#008ef8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m381 118.73-88.92-19.15a7.46 7.46 0 0 1-5.89-7.29v-41.1a7.46 7.46 0 0 1 7.46-7.46h88.87a7.46 7.46 0 0 1 7.48 7.46v60.25a7.45 7.45 0 0 1-9 7.29Z"
                          />
                          <path
                            fill="none"
                            stroke="#008ef8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m294.51 100.1 3.49 9.75 15.71-5.61-19.2-4.14z"
                          />
                          <path
                            fill="#008ef8"
                            d="m313.06 104.47.65-.23-19.2-4.14 1.24 3.45 17.31.92zM338.13 92.67h-2.85l-3.79-36.88 9.56-2.05-2.92 38.93z"
                          />
                          <circle
                            cx="336.55"
                            cy="97.86"
                            r="2.24"
                            fill="#008ef8"
                          />
                          <path
                            fill="#0234c1"
                            d="M162.9 262.15a35.39 35.39 0 0 1-6.22-4.27 33.91 33.91 0 0 1-5-5.66 39.53 39.53 0 0 1-6-13.89 59.78 59.78 0 0 1-1.32-15.08 70.18 70.18 0 0 1 2.12-14.93c-.42 2.48-.77 5-1 7.46s-.37 5-.37 7.49a63 63 0 0 0 1.52 14.83 40.65 40.65 0 0 0 5.66 13.69 34.22 34.22 0 0 0 4.74 5.73 39.51 39.51 0 0 0 5.87 4.63ZM134 238.49c.13 3.46.35 6.91.78 10.32a75.06 75.06 0 0 0 2 10.1 55 55 0 0 0 3.53 9.63 43.9 43.9 0 0 0 5.51 8.68c-.6-.62-1.19-1.25-1.78-1.89s-1.09-1.35-1.64-2-1-1.44-1.46-2.17a24.07 24.07 0 0 1-1.32-2.25 45.33 45.33 0 0 1-3.81-9.72 58 58 0 0 1-1.75-10.28 64.49 64.49 0 0 1-.06-10.42ZM273.24 245.39a33.33 33.33 0 0 1 2 6.73 36.71 36.71 0 0 1 .45 7 44.4 44.4 0 0 1-3 13.74 64.89 64.89 0 0 1-6.55 12.42 66.56 66.56 0 0 1-9 10.76q2.31-2.62 4.37-5.44c1.4-1.85 2.71-3.77 3.94-5.74a69.34 69.34 0 0 0 6.27-12.36 53.78 53.78 0 0 0 2.08-6.6 49 49 0 0 0 1-6.83 36.55 36.55 0 0 0-1.56-13.68ZM286.42 290.17a72.38 72.38 0 0 0 1.73-7.16 47 47 0 0 0 .77-7.27 40.31 40.31 0 0 0-.47-7.28 34.2 34.2 0 0 0-.76-3.59c-.16-.59-.31-1.18-.49-1.77s-.39-1.17-.57-1.76c.29.55.56 1.11.82 1.67s.47 1.15.71 1.73a31.41 31.41 0 0 1 1 3.59 30.45 30.45 0 0 1 .72 7.44 34.9 34.9 0 0 1-1 7.41 36.63 36.63 0 0 1-2.46 6.99Z"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h3 className="mt-10 text-xl font-semibold text-center text-red-400">
                    Đừng quên thêm sản phẩm trước khi đặt nhé
                  </h3>
                  <p className="text-sm text-red-500">{errors.cart?.message}</p>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
      {submitData && (
        <div className="flex mx-auto">
          <div className="flex flex-col mx-auto text-lg gap-y-5">
            <span>
              <strong>Mã đơn hàng:</strong> {submitData._id}
            </span>
            <span>
              <strong>Tên khách hàng:</strong> {submitData.fullName}
            </span>
            <span>
              <strong>Email:</strong> {submitData.email}
            </span>
            <span>
              <strong>Địa chỉ:</strong> {submitData.address}
            </span>
            <span>
              <strong>Số điện thoại:</strong> {submitData.phone}
            </span>
            <span>
              <strong>Tổng tiền:</strong> {submitData.total}
            </span>
            <p className="font-semibold">
              Bạn cố gắng nhớ mã đơn hàng để tiện cho việc đổi trả bạn nhé!!!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
