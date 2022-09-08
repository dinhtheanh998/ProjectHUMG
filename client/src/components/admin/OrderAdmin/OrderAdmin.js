import React, { useCallback, useEffect } from "react";
import BottomBodyAdm from "../BottomBodyAdm";
import _debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DropDownHook from "../../customForm/DropDownHook";
import { useWatch, useForm } from "react-hook-form";
import DropDownCustomOrder from "../../customForm/DropdownCustomOrder";
import { converCurences, getSearchResultPage } from "../../../config/config";
import OrderPagination from "./OrderPagination";

const stateOrder = [
  {
    id: 1,
    name: "Chờ xác nhận",
    value: "Chờ xác nhận",
    color: "#61481C",
  },
  {
    id: 2,
    name: "Đã xác nhận",
    value: "Đã xác nhận",
    color: "#6E85B7",
  },
  {
    id: 3,
    name: "Thành công",
    value: "Thành công",
    color: "#59CE8F",
  },
  {
    id: 4,
    name: "Đã hủy",
    value: "Đã hủy",
    color: "#2C3639",
  },
];

const OrderAdmin = () => {
  let numPages = 0;
  let newDataOrder = [];
  const [curPage, setCurPage] = React.useState(1);
  const [dataOrder, setDataOrder] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState([]);
  const [searchData, setSearchData] = React.useState();
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm();
  if (dataOrder.length > 0) {
    numPages = Math.ceil(dataOrder.length / 10);
    newDataOrder = getSearchResultPage(curPage, dataOrder);
  }
  // console.log(newDataOrder);
  useEffect(() => {
    axios
      .get("/api/order")
      .then((res) => {
        setDataOrder(res.data);
      })
      .catch((err) => {});
  }, [showDetails]);

  const fetchDataWithSearch = (key) => {
    axios.get(`/api/order/query=${key}`).then((res) => {
      setSearchData(res.data);
    });
  };
  const debounceDropDown = useCallback(
    _debounce((nextValue) => fetchDataWithSearch(nextValue), 1000),
    []
  );

  const handleShowDetails = (index) => {
    if (showDetails.includes(index)) {
      setShowDetails(showDetails.filter((i) => i !== index));
    } else {
      setShowDetails((prev) => [...prev, index]);
    }
  };
  const handleOnSubmit = (data) => {
    console.log(data);
  };
  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setSearchData("");
    }
    debounceDropDown(e.target.value);
  };

  return (
    <BottomBodyAdm>
      <div className=" z-[99] pt-4 top-5 ">
        <div className="relative flex items-center ">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:text-white focus:outline-blue-400"
              placeholder="Nhập số điện thoại hoặc mã đơn hàng"
              required
              onChange={handleSearchChange}
            />
          </div>
          <div className="absolute right-0 h-full w-[150px] bg-white rounded-tr-lg rounded-br-lg flex items-center pl-3 border font-semibold">
            <DropDownCustomOrder
              control={control}
              name="data"
              data={stateOrder}
              dropDownLabel={"Chọn trạng thái"}
              setValue={setValue}
              search={true}
              setSearchData={setSearchData}
            ></DropDownCustomOrder>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-10 p-3 font-semibold text-sm text-[#c6cad2] items-center">
        <span className="mr-3">Họ và tên</span>
        <span className="col-span-2 mr-3">email</span>
        <span className="col-span-2 mr-3">Địa chỉ</span>
        <div className="col-span-3 mx-3">
          <div className="grid grid-cols-2">
            <span className="mx-3">Số điện thoại</span>
            <span className="mx-3">Tổng tiền</span>
          </div>
        </div>
        <span className="col-span-2 mx-3">
          <div className="grid grid-cols-2">
            <span>Trạng thái</span>
          </div>
        </span>
      </div>
      <div className="orderList">
        {!searchData &&
          newDataOrder &&
          newDataOrder.length > 0 &&
          newDataOrder.map((item, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                <form
                  onSubmit={handleSubmit(handleOnSubmit)}
                  className={`relative grid items-center grid-cols-10 p-3 mt-4 bg-white rounded-xl first:mt-0 ${
                    item.state === "Đã hủy"
                      ? "opacity-40 select-none read-only"
                      : ""
                  }`}
                  key={uuidv4()}
                >
                  {item.paymentMethods === "Internet Banking" && (
                    <div className="absolute px-2 font-semibold text-white bg-teal-600 shadow-md bottom-1 -left-[6px] infopayment--bk">
                      Banking
                    </div>
                  )}
                  {item.paymentMethods === "Ship COD" && (
                    <div className="absolute px-2 font-semibold text-white bg-orange-300 shadow-md bottom-1 -left-[6px] infopayment--cod">
                      COD
                    </div>
                  )}
                  <div className="col-span-1">
                    <span className="font-semibold">{item.fullName}</span>
                  </div>
                  <span className="col-span-2">
                    <span className="text-sm font-semibold">{item.email}</span>
                  </span>
                  <span className="col-span-2 ml-3 font-semibold">
                    {item.address}
                  </span>
                  <div className="col-span-3 mx-3">
                    <div className="grid grid-cols-2">
                      <span className="">
                        <span className="mx-3 font-semibold">{item.phone}</span>
                      </span>
                      <div className="mx-3 font-semibold text-red-400">
                        {converCurences(item.total)}đ
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 mx-3 font-semibold ">
                    <div className="relative flex items-center">
                      <span className="w-[70%]">
                        <DropDownCustomOrder
                          control={control}
                          name="state"
                          data={stateOrder}
                          dropDownLabel={item.state}
                          setValue={setValue}
                          item={item}
                        ></DropDownCustomOrder>
                      </span>
                      <div
                        className="absolute -right-0"
                        onClick={() => {
                          handleShowDetails(index);
                        }}
                      >
                        <span className="py-2 px-4 bg-[#f7f7f7] border  border-gray-50 rounded-lg font-semibold hover:bg-black hover:text-white transition-all cursor-pointer float-right min-w-[64px]">
                          {showDetails.includes(index) ? "Ẩn" : "Xem"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* /////////////////// */}

                  <div
                    className={`col-span-10 transition-all border-t border-gray-300 mt-3 ${
                      showDetails.includes(index)
                        ? "h-[auto] opacity-100 visible"
                        : "h-[0] opacity-0 invisible"
                    }`}
                  >
                    <div className="grid grid-cols-10 pt-2">
                      <div className="flex items-center col-span-3 gap-x-3">
                        Sản phẩm
                      </div>
                      <div className="">Màu</div>
                      <div className="">Giá</div>
                      <div className="">Số lượng</div>
                      <div className="">Size</div>
                    </div>
                    {item.details.map((itemDetail) => {
                      return (
                        <div className="col-span-10 mb-3" key={uuidv4()}>
                          <div className="grid items-center grid-cols-10">
                            <div className="flex items-center col-span-3 gap-x-3">
                              <img
                                src={`/images/${itemDetail.images}`}
                                alt=""
                                className="w-[50px] h-[50px] object-cover rounded-lg"
                              />
                              <span className="col-span-1">
                                {itemDetail.name}
                              </span>
                            </div>
                            <div className="">
                              <span
                                className="px-6 py-1 rounded-lg"
                                style={{
                                  backgroundColor: `${itemDetail.color}`,
                                }}
                              ></span>
                            </div>
                            <div className="">
                              {itemDetail.unitPromotionalPrice}
                            </div>
                            <div className="">{itemDetail.quantity}</div>
                            <div className="">{itemDetail.size}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </form>
              </React.Fragment>
            );
          })}
        {searchData &&
          searchData?.length > 0 &&
          searchData?.map((item, index) => {
            return (
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="relative grid items-center grid-cols-10 p-3 mb-2 bg-white rounded-xl"
                key={uuidv4()}
              >
                {item.paymentMethods === "Internet Banking" && (
                  <div className="absolute px-2 font-semibold text-white bg-teal-600 shadow-md bottom-1 -left-[6px] infopayment--bk">
                    Banking
                  </div>
                )}
                {item.paymentMethods === "Ship COD" && (
                  <div className="absolute px-2 font-semibold text-white bg-orange-300 shadow-md bottom-1 -left-[6px] infopayment--cod">
                    COD
                  </div>
                )}
                <div className="col-span-1">
                  <span className="font-semibold">{item.fullName}</span>
                </div>
                <span className="col-span-2">
                  <span className="text-sm font-semibold">{item.email}</span>
                </span>
                <span className="col-span-2 ml-3 font-semibold">
                  {item.address}
                </span>
                <div className="col-span-3 mx-3">
                  <div className="grid grid-cols-2">
                    <span className="">
                      <span className="mx-3 font-semibold">{item.phone}</span>
                    </span>
                    <div className="mx-3 font-semibold text-red-400">
                      {converCurences(item.total)}đ
                    </div>
                  </div>
                </div>
                <div className="col-span-2 mx-3 font-semibold ">
                  <div className="relative flex items-center">
                    <span className="w-[70%]">
                      <DropDownCustomOrder
                        control={control}
                        name="state"
                        data={stateOrder}
                        dropDownLabel={item.state}
                        setValue={setValue}
                        item={item}
                      ></DropDownCustomOrder>
                    </span>
                    <div
                      className="absolute -right-0"
                      onClick={() => {
                        handleShowDetails(index);
                      }}
                    >
                      <span className="py-2 px-4 bg-[#f7f7f7] border  border-gray-50 rounded-lg font-semibold hover:bg-black hover:text-white transition-all cursor-pointer float-right min-w-[64px]">
                        {showDetails.includes(index) ? "Ẩn" : "Xem"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* /////////////////// */}

                <div
                  className={`col-span-10 transition-all border-t border-gray-300 mt-3 ${
                    showDetails.includes(index)
                      ? "h-[auto] opacity-100 visible"
                      : "h-[0] opacity-0 invisible"
                  }`}
                >
                  <div className="grid grid-cols-10 pt-2">
                    <div className="flex items-center col-span-3 gap-x-3">
                      Sản phẩm
                    </div>
                    <div className="">Màu</div>
                    <div className="">Giá</div>
                    <div className="">Số lượng</div>
                    <div className="">Size</div>
                  </div>
                  {item.details.map((itemDetail) => {
                    return (
                      <div className="col-span-10 mb-3" key={uuidv4()}>
                        <div className="grid items-center grid-cols-10">
                          <div className="flex items-center col-span-3 gap-x-3">
                            <img
                              src={`/images/${itemDetail.images}`}
                              alt=""
                              className="w-[50px] h-[50px] object-cover rounded-lg"
                            />
                            <span className="col-span-1">
                              {itemDetail.name}
                            </span>
                          </div>
                          <div className="">
                            <span
                              className="px-6 py-1 rounded-lg"
                              style={{
                                backgroundColor: `${itemDetail.color}`,
                              }}
                            ></span>
                          </div>
                          <div className="">
                            {itemDetail.unitPromotionalPrice}
                          </div>
                          <div className="">{itemDetail.quantity}</div>
                          <div className="">{itemDetail.size}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>
            );
          })}
        <OrderPagination
          curPage={curPage}
          setCurPage={setCurPage}
          numPages={numPages}
        ></OrderPagination>
      </div>
    </BottomBodyAdm>
  );
};

export default OrderAdmin;
