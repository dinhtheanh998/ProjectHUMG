import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const ExchangeRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleOnSubmit = (data) => {
    axios.post("/api/exchangeRequest", data).then((res) => { 
      console.log(res);
    })
  };
  return (
    <form
      className="text-base max-w-[900px] mx-auto"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">Vui lòng nhập số điện thoại đặt hàng của bạn:</label>
        <input
          {...register("phone")}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">Vui lòng nhập mã đơn hàng:</label>
        <input
          {...register("OrderId")}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">Vui lòng nhập tên sản phẩm cần đổi:</label>
        <input
          {...register("productFromCustomer")}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">Vui lòng nhập tên sản phẩm bạn muốn đổi:</label>
        <input
          {...register("productNew")}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">Lí do đổi sản phẩm</label>
        <textarea
          {...register("reason")}
          className="p-3 border border-gray-300 rounded-lg"
        ></textarea>
      </div>
      <button
        type="submit"
        className="float-right px-5 py-2 mb-5 font-semibold text-white transition-all bg-black rounded-lg hover:text-black hover:bg-slate"
      >
        Xác nhận
      </button>
    </form>
  );
};

export default ExchangeRequest;
