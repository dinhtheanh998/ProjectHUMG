import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropDownWithImage = ({
  control,
  setValue,
  name,
  data,
  dropDownLabel,
}) => {
  const { show, setShow, showRef } = useClickOutSide();
  const [label, setLabel] = useState({
    name: dropDownLabel,    
  });

  const dropDownValue = useWatch({
    control,
    name: name,
    defaultValue: "",
  });

  const handleItemDropValue = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel({
      name: e.target.textContent,
      lbImage:e.target.dataset.img
    });
  };
  useEffect(() => {
    if (dropDownValue === "") setLabel({
      name: dropDownLabel,    
    });
  }, [dropDownValue]);
  return (
    <div className="relative" ref={showRef}>
      <div
        className="flex items-center py-3 px-5 bg-white rounded-xl cursor-pointer min-w-[226px] border border-gray-300"
        onClick={() => {
          setShow(!show);
        }}
      >
        <div className="flex items-center gap-x-5">
          {label.lbImage && 
          <div className="w-[20px] h-[20px]">
            <img
              src={`/images/${label.lbImage}`}
              alt=""
              className="object-cover w-full h-full"
            />            
            </div>
          }
          {label.name}
        </div>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-md overflow-hidden border border-gray-300 ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => {
          return (
            <div
              key={item._id}
              className="z-10 flex items-center p-1 transition-all bg-white gap-y-3 hover:bg-gray-200"
            >
              <div className="w-[50px] h-[50px]">
                <img
                  src={`/images/${item.images}`}
                  alt=""
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div
                className="flex-1 p-5 cursor-pointer "
                onClick={handleItemDropValue}
                data-value={item._id}
                data-img={item.images}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropDownWithImage;
