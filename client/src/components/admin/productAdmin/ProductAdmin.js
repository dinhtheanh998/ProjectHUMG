import React, { useEffect, useRef, useState } from "react";
import BottomBodyAdm from "../BottomBodyAdm";
import ReactDOM from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  converCurences,
  getAllProduct,
  getPriceByTime,
} from "../../../config/config";
import { v4 as uuidv4 } from "uuid";
import ChartPriceByTime from "./ChartPriceByTime";
import { data } from "../HomeAdmin/ChartData";
import UpDateProductFromExcel from "./UpDateProductFromExcel";
const downloadExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, "Product.xlsx");
};

const ProductAdmin = () => {
  const navigate = useNavigate();
  const [dataPro, setdataPro] = useState();
  const [showOption, setShowOption] = useState(null);
  const [priceByTime, setPriceByTime] = useState();
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });
  console.log(dataPro)
  const [updateFileExcel, setUpdateFileExcel] = useState(null);
  const [showChart, SetShowChart] = useState(false);

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

  const handleGetPriceByTime = (id) => {
    SetShowChart(true);
    getPriceByTime(id).then((data) => {
      setPriceByTime(data[0]?.price?.flat());
    });
  };

  const handleClickOptions = (e, index) => {
    if (showOption === index) setShowOption(null);
    else setShowOption(index);
  };
  document.addEventListener("click", function (e) {
    setShowOption(null);
  });

  const handleUpdateByExcel = (e) => {
    e.preventDefault();
    console.log(updateFileExcel);
    const formData = new FormData();
    formData.append("upFileExcel", updateFileExcel);
    axios.put("/api/products/updateExcel", formData).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <BottomBodyAdm>
        <div className="flex items-center justify-between mt-3 gap-x-5">
          <NavLink
            to="add-product"
            type="button"
            className="px-5 py-2 mb-4 font-semibold text-white bg-blue-400 rounded-lg hover:text-white"
          >
            Thêm sản phẩm
          </NavLink>
          <div className="flex items-center gap-x-5">
            {/* <span className="px-6 py-2 mb-4 font-semibold text-white bg-pink-400 rounded-lg cursor-pointer select-none b-4 gap-x-3">Cập nhật bằng file excel</span> */}
            <UpDateProductFromExcel></UpDateProductFromExcel>
            
            <button
              className="flex items-center px-6 py-2 mb-4 font-semibold text-white bg-green-400 rounded-lg cursor-pointer select-none gap-x-3"
              onClick={() => {
                downloadExcel(dataPro);
              }}
            >
              <span>
                <svg
                  version="1.1"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  strokeWidth="10"
                >
                  <g id="Exel_download">
                    <g>
                      <g>
                        <path
                          d="M80.016,96h-8.297L63.75,83.039L55.781,96H48l11.367-17.672L48.727,61.734h8.016l7.383,12.328     l7.242-12.328h7.828L68.438,78.727L80.016,96z"
                          fill="#fff"
                        />
                      </g>
                      <g>
                        <g>
                          <path
                            d="M104,80c-13.255,0-24,10.745-24,24s10.745,24,24,24s24-10.745,24-24S117.255,80,104,80z       M114.882,96.988l-0.113,0.176l-8.232,11.438C105.989,109.468,105.029,110,104,110s-1.989-0.532-2.536-1.397l-8.346-11.614      c-0.529-0.926-0.524-2.073,0.01-2.994c0.535-0.922,1.53-1.494,2.596-1.494H100V86c0-1.654,1.346-3,3-3h2c1.654,0,3,1.346,3,3      v6.5h4.276c1.065,0,2.061,0.572,2.596,1.494C115.406,94.915,115.411,96.063,114.882,96.988z"
                            fill="#fff"
                          />
                        </g>
                        <g>
                          <g>
                            <polygon
                              points="84,125.95 83.95,126 84,126      "
                              fill="#FF9A30"
                            />
                          </g>
                          <g>
                            <polygon
                              points="114,77 114,76.95 113.95,77      "
                              fill="#FF9A30"
                            />
                          </g>
                          <g>
                            <path
                              d="M111.071,44.243L71.757,4.929C69.869,3.041,67.357,2,64.687,2H24c-5.514,0-10,4.486-10,10v104       c0,5.514,4.486,10,10,10h59.95l-4-4H24c-3.309,0-6-2.691-6-6V12c0-3.309,2.691-6,6-6h40.687c1.603,0,3.109,0.624,4.242,1.757       l39.314,39.314c1.116,1.117,1.757,2.663,1.757,4.242V72.95l4,4V51.313C114,48.643,112.96,46.132,111.071,44.243z"
                              fill="#fff"
                              stroke="#fff"
                              strokeWidth="5"
                            />
                          </g>
                          <g>
                            <polyline
                              points="113.95,77 114,76.95 110,72.95      "
                              fill="#FFFFFF"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span>Export</span>
            </button>
          </div>
        </div>

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
                        src={`/images/${item.images[0]}`}
                        alt=""
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="col-start-4 col-end-6 mr-4">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      {typeof item.categories === "object" && item.categories && item.categories.length > 0 && item.categories.map((item, index) => {
                        return (
                          <span className="px-2 py-1 text-sm font-semibold text-white bg-orange-300 rounded-lg">
                            {item.label}
                          </span>
                        )
                       })}
                      {/* <span className="px-2 py-1 text-sm font-semibold text-white bg-orange-300 rounded-lg">
                        Tshirts
                      </span>
                      <span className="px-2 py-1 text-sm font-semibold text-white bg-orange-300 rounded-lg">
                        Tshirts
                      </span> */}
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
                        className={`absolute right-0  font-semibold transition-all origin-top-right  rounded-md cursor-pointer top-full option-pro-delete ${
                          showOption === index
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0 "
                        }`}
                      >
                        <div>
                          <button
                            type="button"
                            className="px-4 py-2 font-semibold transition-all bg-blue-400 border rounded-lg border-gray-50 hover:bg-blue-800 hover:text-white"
                            onClick={() => {
                              handleGetPriceByTime(item._id);
                            }}
                          >
                            Xem
                          </button>
                        </div>
                        <div
                          className={`px-4 py-2 font-semibold transition-all bg-red-400 border rounded-lg border-gray-50 hover:bg-red-800 hover:text-white`}
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Xóa
                        </div>
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
        {priceByTime && showChart && (
          <ChartShow
            data={data(
              priceByTime,
              priceByTime.map((item) => "")
            )}
            SetShowChart={SetShowChart}
            setPriceByTime={setPriceByTime}
          ></ChartShow>
        )}
        {!priceByTime && showChart && (
          <p>Sản phẩm này chưa bán được đâu azai</p>
        )}
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

function ChartShow({ data, SetShowChart, setPriceByTime }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 rounded-lg modal">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black opacity-20 p-5  modal `}
        onClick={() => {
          SetShowChart(null);
          setPriceByTime(undefined);
        }}
      ></div>
      <div className="absolute z-[99999] flex flex-col items-center mx-auto gap-y-5 justify-center bg-white p-10 rounded-lg w-[700px]">
        <ChartPriceByTime data={data}></ChartPriceByTime>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default ProductAdmin;
