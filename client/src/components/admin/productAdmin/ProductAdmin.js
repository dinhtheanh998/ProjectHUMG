import React, { useEffect, useRef, useState } from "react";
import BottomBodyAdm from "../BottomBodyAdm";
import ReactDOM from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { converCurences, getAllProduct } from "../../../config/config";
import { v4 as uuidv4 } from "uuid";

const ProductAdmin = () => {
  const navigate = useNavigate();
  const [dataPro, setdataPro] = useState();
  const [showOption, setShowOption] = useState(null);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  };

  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      axios.delete(`/api/products/${popup.id}`).then((res) => { 
        console.log(res.data);
      });
      setPopup({
        show: false,
        id: null,
      });
    }
  };

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  useEffect(() => {
    getAllProduct().then((data) => {
      setdataPro(data);
    });
  }, [popup]);

  const handleClickOptions = (e, index) => {
    if (showOption === index) setShowOption(null);
    else setShowOption(index);
  };
  document.addEventListener("click", function (e) {
    setShowOption(null);
  });
  
  return (
    <>
      <BottomBodyAdm>
        <NavLink
          to="add-product"
          type="button"
          className="px-5 py-3 mb-4 font-semibold text-white bg-blue-400 rounded-lg hover:text-white"
        >
          Thêm sản phẩm
        </NavLink>
        <div>
          <div className="grid grid-cols-10  p-3 font-semibold text-sm text-[#c6cad2]">
            <span className="col-start-1 col-end-4 mr-4">Thông tin</span>
            <span className="col-start-4 col-end-6 mr-4">Loại sản phẩm</span>
            <span className="col-start-6 col-end-7 mr-4">Giá</span>
            <span className="col-start-7 col-end-9 mr-4">Giá k.m</span>
            <span className="col-start-9 col-end-10 mr-4">Hành động</span>
          </div>
          {dataPro &&
            dataPro.length > 0 &&
            dataPro.map((item, index) => {
              return (
                <div
                  className="grid items-center grid-cols-10 p-3 mb-2 bg-white rounded-xl"
                  key={uuidv4()}
                >
                  <div className="flex items-center col-start-1 col-end-4 mr-4 gap-x-3">
                    <div className="w-[100px] h-[100px] rounded-lg">
                      <img
                        src={`/images/${item.images}`}
                        alt=""
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="col-start-4 col-end-6 mr-4">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      <span className="px-2 py-1 text-sm font-semibold text-white bg-orange-300 rounded-lg">
                        Tshirts
                      </span>
                      <span className="px-2 py-1 text-sm font-semibold text-white bg-orange-300 rounded-lg">
                        Tshirts
                      </span>
                    </div>
                  </span>
                  <span className="col-start-6 col-end-7 mr-4">
                    <span className="font-semibold">
                      {converCurences(item.unitPrice) + "đ"}
                    </span>
                  </span>
                  <span className="col-start-7 col-end-8 mr-4">
                    <span className="font-semibold text-red-400">
                      {converCurences(item.unitPromotionalPrice) + "đ"}
                    </span>
                  </span>
                  <div className="col-start-9 col-end-10 mr-4">
                    <button
                      type="button"
                      className="py-2 px-4 bg-[#f7f7f7] border  border-gray-50 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all"
                      onClick={() => {
                        navigate(`/admin/edit-product/${item._id}`);
                      }}
                    >
                      Sửa
                    </button>
                  </div>
                  <div className="col-start-10 col-end-11 mr-4 ">
                    <div
                      className={`inline-block px-2 py-1  rounded-lg cursor-pointer pro-option select-none relative ${
                        showOption === index
                          ? "bg-blue-500 text-white"
                          : "bg-[#f7f7f7]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickOptions(e, index);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                      <div
                        className={`absolute right-0 px-3 py-1 bg-[#f8f8f9] cursor-pointer top-full option-pro-delete rounded-md transition-all origin-top-right border border-gray-50 font-semibold hover:opacity-70 ${
                          showOption === index
                            ? "opacity-100 scale-100 bg-red-300 text-white"
                            : "opacity-0 scale-0 "
                        }`}
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Xóa
                      </div>
                    </div>
                  </div>
                  {popup.show && (
                    <Popup
                      handleDeleteTrue={handleDeleteTrue}
                      handleDeleteFalse={handleDeleteFalse}
                    ></Popup>
                  )}
                </div>
              );
            })}
        </div>
      </BottomBodyAdm>
    </>
  );
};

function Popup({ handleDeleteTrue, handleDeleteFalse }) {
  //popup xóa sản phẩm
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 rounded-lg modal">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black opacity-20 p-5  modal `}
      ></div>
      <div className="absolute z-[99999] flex flex-col items-center mx-auto gap-y-5 justify-center bg-white p-10 rounded-lg">
        <span className="flex items-center text-xl font-semibold gap-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="#FFEA11"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Bạn có chắc muốn xóa</span>
        </span>
        <div className="flex justify-between gap-x-5">
          <button
            className="px-4 py-2 font-semibold text-white bg-blue-400 rounded-lg"
            onClick={handleDeleteTrue}
          >
            Có
          </button>
          <button
            className="px-4 py-2 font-semibold text-white bg-red-400 rounded-lg"
            onClick={handleDeleteFalse}
          >
            Không
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default ProductAdmin;
