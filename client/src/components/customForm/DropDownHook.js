import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropDownHook = ({
  control,
  name,
  data,
  dropDownLabel,
  setValue,
  handleClickSize,
  handleClickColor,
  option,
  optionshow,
}) => {
  const { show, setShow, showRef } = useClickOutSide();
  const [label, setLabel] = useState(dropDownLabel);
  const dropDownValue = useWatch({
    control,
    name: name,
    defaultValue: label,
  });
  const handleItemDropValue = (e) => {
    // setValue(name, e.target.dataset.value);
    if (option === "size") {
      handleClickSize(e);
    } else if (option === "color") {
      handleClickColor(e);
    }
    setShow(false);
    setLabel(e.target.textContent);
  };
  useEffect(() => {
    if (dropDownValue === "") setLabel(dropDownLabel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownValue]);
  return (
    <div className="relative" ref={showRef}>
      <div
        className={`flex items-center px-3 py-1 bg-white border border-gray-200 rounded-md cursor-pointer ${
          optionshow ? "" : "h-full px-5"
        }`}
        onClick={() => {
          setShow(!show);
        }}
        style={{
          backgroundColor: label,
        }}
      >
        <div className="flex items-center select-none gap-x-1">
          <span>{optionshow ? label : ""}</span>           
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transition-all ${show ? "transform rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-md overflow-hidden border border-gray-200 text-center${
          show ? "" : "opacity-0 invisible"
        }  `}
      >
        {data &&
          data.map((item, index) => {
            return (
              <div
                className={`px-2  bg-white cursor-pointer h-full z-[999] select-none hover:bg-gray-100 dropDown-${name} ${
                  optionshow ? "py-1" : "py-3"
                }`}
                onClick={handleItemDropValue}
                data-value={item}
                key={index}
                style={{
                  backgroundColor: item,
                }}
              >
                {optionshow ? item : ""}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DropDownHook;
