import React from "react";
import { useForm } from "react-hook-form";
const ReturnRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleOnSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      className="text-base max-w-[900px] mx-auto"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col mb-3 gap-y-3">
          <label htmlFor="">Vui lòng nhập số điện thoại của bạn:</label>
          <input
            {...register("phone")}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-3 gap-y-3">
          <label htmlFor=""> Nhập mã đơn hàng:</label>
          <input
            {...register("orderId")}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col mb-3 gap-y-3">
          <label htmlFor=""> Nhập số tài khoản muốn hoàn tiền của bạn:</label>
          <input
            {...register("bankAccount")}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex flex-col flex-1 mb-3 gap-y-3">
          <label htmlFor="">Nhập tên ngân hàng:</label>
          <input
            {...register("bankName")}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col flex-1 mb-3 gap-y-3">
          <label htmlFor="">Chủ tài khoản :</label>
          <input
            {...register("accountHolder")}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">
          Tránh sai sót hãy nhập cả chi nhánh ngân hàng nhé:
        </label>
        <input
          {...register("bankBranch")}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col mb-3 gap-y-3">
        <label htmlFor="">Hãy cho shop biết lí do bạn muốn trả hàng nhé:</label>
        <textarea
          {...register("description")}
          className="px-4 py-2 border border-gray-300 rounded-lg "
        />
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

export default ReturnRequest;
