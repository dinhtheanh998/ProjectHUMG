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
        className="flex items-center px-3 py-1 bg-white border border-gray-200 rounded-md cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}
        style={{
          backgroundColor:label
        }}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-md overflow-hidden border border-gray-200 text-center${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data &&
          data.map((item, index) => {
            return (
              <div
                className={`px-2 py-1 bg-white cursor-pointer hover:bg-gray-100 dropDown-${name}`}
                onClick={handleItemDropValue}
                data-value={item}
                key={index}
                style={{ 
                  backgroundColor:item
                }}
              >
                {item}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DropDownHook;
