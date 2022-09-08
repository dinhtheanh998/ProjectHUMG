import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DropDownWithImage from "../../customForm/DropDownWithImage";
import BottomBodyAdm from "../BottomBodyAdm";
import { v4 as uuidv4 } from "uuid";
import DropDownCustom from "../../customForm/DropDownCustom";
import DropDownCustom2 from "../../customForm/DropDownCustom2";
import { notifySuccess } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const dataSize = [
  {
    _id: uuidv4(),
    name: "S",
    value: "S",
  },
  {
    _id: uuidv4(),
    name: "M",
    value: "M",
  },
  {
    _id: uuidv4(),
    name: "L",
    value: "L",
  },
  {
    _id: uuidv4(),
    name: "XL",
    value: "XL",
  },
  {
    _id: uuidv4(),
    name: "2XL",
    value: "2XL",
  },
];

const CreateProductDetailAdmin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { control, setValue, register, handleSubmit } = useForm();
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    document.title = "Thêm chi tiết sản phẩm";
  }, []);

  const handleOnSubmit = (data) => {
    axios.post("/api/productsInfo", data).then((res) => {
      if (res.status === 200) notifySuccess("Thêm thành công");
      setTimeout(() => {
        navigate("/admin/ProductDetailsAdmin");
      }, 1500);
    });
  };

  return (
    <BottomBodyAdm>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex items-center gap-x-6">
          <div className="flex flex-col mt-5 mb-5 gap-y-3">
            <label htmlFor="name">Chọn sản phẩm</label>
            <DropDownWithImage
              control={control}
              data={data}
              setValue={setValue}
              name="productID"
              dropDownLabel="Chọn sản phẩm"
            ></DropDownWithImage>
          </div>
          <div className="flex flex-col mt-5 mb-5 gap-y-3">
            <label htmlFor="name">Chọn size sản phẩm</label>
            <DropDownCustom2
              control={control}
              name="size"
              data={dataSize}
              setValue={setValue}
              dropDownLabel="Chọn Size"
            ></DropDownCustom2>
          </div>
          <div className="flex flex-col mt-5 mb-5 gap-y-3">
            <label htmlFor="name">Chọn màu sản phẩm</label>
            <input type="color" {...register("color")} />
          </div>
          <div className="flex flex-col mt-5 mb-5 gap-y-3">
            <label htmlFor="name">Số lượng</label>
            <input
              type="text"
              {...register("quantity")}
              className="px-5 py-3 border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        <button
          className="flex items-center justify-center button-primary gap-x-3"
          type="submit"
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>Xác nhận</span>
        </button>
      </form>
    </BottomBodyAdm>
  );
};

export default CreateProductDetailAdmin;
