import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomBodyAdm from "../BottomBodyAdm";
import { NavLink } from "react-router-dom";

const ProductDetailsAdmin = () => {
  const [dataPro, setDataPro] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/productsInfo/moreInfo").then((response) => {
      setDataPro(response.data);
    });
  }, []);

  return (
    <BottomBodyAdm>
      <NavLink
        to="add-productDetails"
        type="button"
        className="px-5 py-3 mb-4 font-semibold text-white bg-blue-400 rounded-lg hover:text-white"
      >
        Thêm chi tiết
      </NavLink>

      <div className="grid grid-cols-10  p-3 font-semibold text-sm text-[#c6cad2] select-none">
        <span className="col-start-1 col-end-4 mr-4">Thông tin</span>
        <span className="flex justify-center col-start-4 col-end-7 mr-4">
          <span className="w-2/4">Size</span>
          <span className="w-2/4">Màu</span>
        </span>
        <span className="col-start-7 col-end-9 mr-4">Tổng Số lượng</span>
        <span className="col-start-9 col-end-10 mr-4">Hành động</span>
      </div>
      {dataPro &&
        dataPro.length > 0 &&
        dataPro.map((item) => (
          <InfoProduct key={item._id} item={item} navigate={navigate}></InfoProduct>
        ))}
    </BottomBodyAdm>
  );
};

const InfoProduct = ({ item , navigate }) => {
  return (
    <div className="grid items-center grid-cols-10 p-3 mb-2 bg-white rounded-xl">      
      <div className="flex items-center col-start-1 col-end-4 mr-4 gap-x-2">
        <div className="w-[100px] h-[100px] rounded-lg">
          <img
            src={`/images/${item.productInfo.images[0]}`}
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <span className="font-semibold">{item.productInfo.name}</span>
      </div>
      <div className="flex col-start-4 col-end-7 mr-4 gap-x-2">
        <div className="flex flex-wrap items-center w-2/4 gap-x-1 gap-y-1">
          {item.size &&
            item.size.length > 0 &&
            item.size.map((item) => {
              return (
                <span className="px-3 py-1 font-semibold text-white bg-red-300 rounded-lg" key={uuidv4()}>
                  {item}
                </span>
              );
            })}
        </div>
        {/* size */}
        <div className="flex flex-wrap items-center w-2/4 gap-x-1 gap-y-1">
          {item.color &&
            item.color.length > 0 &&
            item.color.map((item) => {
              return (
                <span
                  className="w-[20px] h-[20px] inline-block font-semibold text-white rounded-lg"
                  style={{
                    backgroundColor: item,
                  }}
                key={uuidv4()}></span>
              );
            })}
        </div>
      </div>
      <span className="flex col-start-7 col-end-9 mr-4 font-semibold gap-x-2">
        {item.total}
      </span>
      <div className="col-start-9 col-end-10 mr-4">
        <button type="button" className="" onClick={() => {
          navigate(`./${item._id}`)
        }}>
          Xem
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsAdmin;
