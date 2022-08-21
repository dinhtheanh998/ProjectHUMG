import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DropDownCustom2 from "../../customForm/DropDownCustom2";
import BottomBodyAdm from "../BottomBodyAdm";

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

const EditInfoProduct = () => {
  const { infoId } = useParams();
  const [dataInfo, setDataInfo] = useState();
  const { control, setValue, register, handleSubmit } = useForm();
  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios
      .get(`/api/productsInfo/getInfoById/${infoId}`)
      .then((res) => {
        if (!unmounted) {
          setDataInfo(res.data[0]);
        }
      })
      .catch((err) => {
        if (!unmounted) {
          if (axios.isCancel(err)) {
            console.log("request canceled:" + err.message);
          } else {
            console.log("another error:" + err.message);
          }
        }
      });
    return () => {
      unmounted = true;
      source.cancel("cancel request");
    };
  }, [infoId]);
    const handleOnSubmit = (data) => {
      console.log(data);
    axios
      .put(`/api/productsInfo/update/${infoId}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <BottomBodyAdm>
      {dataInfo && (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="flex items-center gap-x-5">
            <div className="flex flex-col mt-5 mb-5 gap-y-3">
              <label htmlFor="name">Số lượng</label>
              <input
                type="text"
                defaultValue={dataInfo.quantity}
                {...register("quantity")}
                className="px-5 py-3 border border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col mt-5 mb-5 gap-y-3">
              <label htmlFor="name">Chọn màu sản phẩm</label>
              <input
                type="color"
                defaultValue={dataInfo.color}
                {...register("color")}
              />
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
      )}
    </BottomBodyAdm>
  );
};

export default EditInfoProduct;
