import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputForm from "../../customForm/InputForm";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const { control, handleSubmit } = useForm();
  const notify = () =>
    toast.success("Thêm thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const navigate = useNavigate();
  const OnsubmitHandle = (data) => {
    axios.post("/api/category", data).then((res) => {
      if (res.status === 200) notify();
      setTimeout(() => {
        navigate("/admin/CategoryAdmin");
      }, 2000);
      //
    });
  };

  return (
    <>
      <form
        className="category-form w-full max-w-[300px] mx-auto my-10"
        onSubmit={handleSubmit(OnsubmitHandle)}
      >
        <div className="flex flex-col mb-5 gap-y-3">
          <label htmlFor="name">Tên loại sản phẩm</label>
          <InputForm
            id="name"
            name="name"
            placeholder="Nhập tên loại"
            control={control}
          ></InputForm>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg"
        >
          Xác nhận
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
