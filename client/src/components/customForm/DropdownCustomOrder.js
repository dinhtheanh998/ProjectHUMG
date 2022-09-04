import axios from "axios";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";
const DropDownCustomOrder = ({
  control,
  setValue,
  name,
  data,
  item,
  dropDownLabel,
  search,
  setSearchData,
}) => {
  const { show, setShow, showRef } = useClickOutSide();
  const [label, setLabel] = useState(dropDownLabel);

  const dropDownValue = useWatch({
    control,
    name: name,
    defaultValue: "",
  });
  // const handleUpdateQuantity

  const handleItemDropValue = (e) => {
    if (item) {
      axios
        .put(`/api/order/${item._id}`, { state: e.target.dataset.value })
        .then((res) => {
          // console.log(res.data);
        });
      if (e.target.dataset.value === "Thành công" || e.target.dataset.value === "Đã xác nhận") {
        if (label === "Đã xác nhận" || label === "Thành công") {
          console.log("Không trừ trong database");
        } else {
          console.log(" trừ trong database");

          // item.details.forEach((el) => {
          //   axios.put(
          //     `/api/productsInfo/updateQuantity/id=${
          //       el._id
          //     }&color=${el.color.slice(1)}&size=${el.size}&quantity=${
          //       el.quantity
          //     }`
          //   );
          // });
        }
      }
      if (e.target.dataset.value === "Đã hủy" || e.target.dataset.value === "Chờ xác nhận" ) {
        if (label === "Đã hủy" || label === "Chờ xác nhận") {
          console.log("Không cộng thêm vào trong database");
        } else {
          console.log("Cộng thêm vào trong database");
          // item.details.forEach((el) => {
          //   axios.put(
          //     `/api/productsInfo/updateQuantity/id=${
          //       el._id
          //     }&color=${el.color.slice(1)}&size=${
          //       el.size
          //     }&quantity=${-el.quantity}`
          //   );
          // });
        }
      }
    }
    if (search) {
      axios
        .get(`/api/order/getOrderByState/state=${e.target.dataset.value}`)
        .then((res) => {
          setSearchData(res.data);
        });
    }
    setShow(false);
    setLabel(e.target.textContent);
  };
  useEffect(() => {
    if (dropDownValue === undefined) setLabel(dropDownLabel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownValue]);
  return (
    <div className="relative w-full" ref={showRef}>
      <div
        className="flex items-center bg-white rounded-md cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}
      >
        <span className="select-none">{label}</span>
      </div>
      <div
        className={`z-10 absolute top-full left-0 w-full rounded-md  overflow-hidden${
          show ? "" : "opacity-0 invisible border border-gray-100" 
        }`}
      >
        {item?.state !== "Đã hủy" &&
          item?.state !== "Thành công" &&
          data.map((item) => {
            return (
              <div
                className="z-[9999] p-2 bg-white cursor-pointer text-black hover:bg-gray-100 shadow-sm"
                onClick={handleItemDropValue}
                data-value={item.value}
                key={item.id}
              >
                {item.name}
              </div>
            );
          })}
        {/* {data.map((item) => {
          return (
            <div
              className="z-[9999] p-2 bg-white cursor-pointer text-black hover:bg-gray-100 shadow-sm"
              onClick={handleItemDropValue}
              data-value={item.value}
              key={item.id}
              name="state"
            >
              {item.name}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default DropDownCustomOrder;
