import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import DropDownCustom from "../../customForm/DropDownCustom";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "antd/dist/antd.css";

const notify = () =>
  toast.success("Thêm thành công", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

// validate form

const schema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm không được để trống"),
  unitPrice: yup
    .number()
    .required("Giá sản phẩm không được trống")
    .typeError("Giá sản phẩm phải là số"),
  unitPromotionalPrice: yup
    .number()
    .required("Giá sản phẩm không được trống")
    .typeError("Giá khuyến mại phải là số")
    .lessThan(yup.ref("unitPrice"), "Phải nhỏ hơn giá"),
  description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
});

const fakeData = [
  {
    name: "Quần áo oversize",
    _id: "62cfc9ab5528b5fe3631467a",
  },
];

const fakeData2 = [
  {
    name: "Thủy Hử",
    phone: "09176231263",
    _id: "ncc1",
  },
  {
    name: "Quần áo Mới",
    phone: "09176231263",
    _id: "ncc2",
  },
  {
    name: "Quần áo cũ 2",
    phone: "09176231263",
    _id: "ncc3",
  },
  {
    name: "Quần áo mới 2",
    phone: "09176231263",
    _id: "ncc4",
  },
];

const CreateProduct = () => {
  const [imgData, setImgData] = useState(null);
  const [image, setImage] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);

      setImgData(file);
    }
  };
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onBlur",
  });

  const handleOnSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("unitPrice", data.unitPrice);
    formData.append("unitPromotionalPrice", data.unitPromotionalPrice);
    formData.append("images", image);
    formData.append("description", data.description);
    formData.append("categories", data.categories);
    axios.post("/api/products", formData).then((res) => {
      if (res.status === 200) notify();
      setTimeout(() => {
        navigate("/admin/product-Admin");
      }, 1500);
    });
  };
  return (
    <>
      <form
        className="px-10 py-4 bg-white rounded-xl"
        onSubmit={handleSubmit(handleOnSubmit)}
        encType=""
      >
        <h2 className="pb-2 text-2xl font-semibold border-b border-gray-400">
          Thêm sản phẩm
        </h2>
        <div className="flex flex-col mt-5 mb-5 gap-y-3">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400 ${
              errors.name?.message ? "border-red-400" : ""
            }`}
            placeholder="Tên sản phẩm"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="flex mb-5 gap-x-3">
          <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="unitPrice">Giá sản phẩm</label>
            <input
              type="text"
              id="unitPrice"
              {...register("unitPrice")}
              className="px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400"
              placeholder="Giá sản phẩm"
            />
            <p className="text-sm text-red-500">{errors.unitPrice?.message}</p>
          </div>
          <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="">Giá khuyến mại</label>
            <input
              type="text"
              name="name"
              {...register("unitPromotionalPrice")}
              className="px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400"
              placeholder="Giá khuyến mại"
            />
            <p className="text-sm text-red-500">
              {errors.unitPromotionalPrice?.message}
            </p>
          </div>
          <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="">Loại sản phẩm</label>
            <DropDownCustom
              control={control}
              data={fakeData}
              dropDownLabel="Chọn loại"
              setValue={setValue}
              name="categories"
            ></DropDownCustom>
          </div>
          <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="">Nhà cung cấp</label>
            <DropDownCustom
              control={control}
              data={fakeData2}
              dropDownLabel="Chọn nhà cung cấp"
              setValue={setValue}
              name="supplies"
            ></DropDownCustom>
          </div>
        </div>
        <div className="flex flex-col mb-5 gap-y-3">
          <label htmlFor="" className="cursor-pointer">
            Ảnh sản phẩm
          </label>
          {!imgData && (
            <label
              htmlFor="images"
              className="flex items-center justify-center px-5 py-3 border-2 border-gray-300 border-dotted cursor-pointer rounded-xl gap-x-2"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span>Chọn hình ảnh</span>
              <input
                type="file"
                id="images"
                className="invisible opacity-0"
                onChange={onChangePicture}
                // {...register("images")}
              />
            </label>
          )}
          {/* preview image */}
          {imgData && (
            <div className="mb-5 w-[400px] h-[500px] select-none relative group">
              <img
                src={imgData.preview}
                alt=""
                className="object-cover w-full h-full rounded-lg"
              />
              <span className="absolute w-[40px] h-[40px] rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-slate-200 flex items-center justify-center text-2xl font-semibold z-10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer" onClick={()=> {
                setImgData(null)
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 transition-all bg-white opacity-0 overlay-preview-img group-hover:opacity-50"></div>
            </div>
          )}

          <p className="text-sm text-red-500">{errors.images?.message}</p>
        </div>

        <div className="flex flex-col mb-5 gap-y-3">
          <label htmlFor="description">Mô tả sản phẩm</label>
          <textarea
            id="description"
            {...register("description")}
            className="border border-gray-300 rounded-xl resize-none min-h-[200px] focus:border-blue-400 outline-none p-4"
            placeholder="Mô tả sản phẩm"
          />
        </div>
        <div className="flex items-center gap-x-10">
          <button
            type="button"
            className="flex items-center justify-center button-primary gap-x-3"
            onClick={() => {
              navigate("/admin/product-Admin");
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>Quay lại</span>
          </button>
          <button className="flex items-center justify-center button-primary gap-x-3">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>Xác nhận</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
