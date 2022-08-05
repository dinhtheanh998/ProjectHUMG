import axios from "axios";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropDownCustomOrder = ({ control, setValue, name, data,item, dropDownLabel }) => {
  const { show, setShow, showRef } = useClickOutSide();
  const [label, setLabel] = useState(dropDownLabel);

  const dropDownValue = useWatch({
    control,
    name: name,
    defaultValue: "",
  });
  // const handleUpdateQuantity

  const handleItemDropValue = (e) => {
    
    axios.put(`/api/order/${item._id}`, {state:e.target.dataset.value}).then((res) => { 
      // console.log(res.data);
    })

    if (e.target.dataset.value === "Thành công") {
      item.details.forEach((el) => { 
        // console.log(`/api/productsInfo/updateQuantity/id=${el._id}&color=${el.color.slice(1)}&size=${el.size}&quantity=${el.quantity}`);
        axios.put(`/api/productsInfo/updateQuantity/id=${el._id}&color=${el.color.slice(1)}&size=${el.size}&quantity=${el.quantity}`)
      })
    }
    setShow(false);
    setLabel(e.target.textContent);    
  };
  useEffect(() => {
    if (dropDownValue === undefined) setLabel(dropDownLabel);
  }, [dropDownValue]);
  return (
    <div className="relative " ref={showRef} >
      <div
        className="flex items-center bg-white rounded-md cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}
      >
        <span className="select-none">{label}</span>
      </div>
      <div
        className={`z-10 absolute top-full left-0 w-full rounded-md border border-gray-100 overflow-hidden${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => {
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
      </div>
    </div>
  );
};

export default DropDownCustomOrder;
