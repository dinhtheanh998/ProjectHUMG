import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropDownCustom = ({ control, setValue, name, data, dropDownLabel, defaultLabelId }) => {
  const { show, setShow, showRef } = useClickOutSide();
  const [label, setLabel] = useState(dropDownLabel);

  const dropDownValue = useWatch({
    control,
    name: name,
    defaultValue: "",
  });

  const handleItemDropValue = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  useEffect(() => {
    if (dropDownValue === "") setLabel(dropDownLabel);
  }, [dropDownValue]);
  
  useEffect(() => { 
    setValue(name,defaultLabelId)
  }, [])
  

  
  return (
    <div className="relative" ref={showRef}>
      <div
        className="flex items-center py-3 px-5 bg-white rounded-xl cursor-pointer min-w-[226px] border border-gray-300"
        onClick={() => {
          setShow(!show);
        }}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-md overflow-hidden border border-gray-300 ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data?.map((item) => {
          return (
            <div
              className="p-5 bg-white cursor-pointer hover:bg-gray-100"
              onClick={handleItemDropValue}
              data-value={item._id}
              key={item._id}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropDownCustom;
