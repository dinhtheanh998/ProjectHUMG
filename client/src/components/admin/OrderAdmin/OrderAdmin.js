import React, { useEffect } from "react";
import BottomBodyAdm from "../BottomBodyAdm";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DropDownHook from "../../customForm/DropDownHook";
import { useWatch, useForm } from "react-hook-form";
import DropDownCustomOrder from "../../customForm/DropdownCustomOrder";
import { converCurences } from "../../../config/config";

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
  const [dataOrder, setDataOrder] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState([]);
  const { register, handleSubmit, control, watch, setValue , getValues } = useForm();
  // const stateWatch = watch("state")
  const value = getValues("state");
  console.log(value);
  useEffect(() => {
    axios
      .get("/api/order")
      .then((res) => {
        setDataOrder(res.data);
      })
      .catch((err) => {});
  }, [showDetails]);
  
  const handleShowDetails = (index) => {
    if (showDetails.includes(index)) {
      setShowDetails(showDetails.filter((i) => i !== index));
    } else {
      setShowDetails((prev) => [...prev, index]);
    }
  };
  const handleOnSubmit = (data) => { 
    console.log(data);
  }
  return (
    <BottomBodyAdm>
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
            <span></span>
          </div>
        </span>
      </div>

      {dataOrder &&
        dataOrder.length > 0 &&
        dataOrder.map((item, index) => {
          return (
            <form onSubmit={handleSubmit(handleOnSubmit)} 
              className="grid items-center grid-cols-10 p-3 mb-2 bg-white rounded-xl"
              key={uuidv4()}
            >
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
                          <span className="col-span-1">{itemDetail.name}</span>
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
    </BottomBodyAdm>
  );
};

export default OrderAdmin;