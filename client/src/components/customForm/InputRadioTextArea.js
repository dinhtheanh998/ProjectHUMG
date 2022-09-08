import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useController } from "react-hook-form";

const InputRadioTextArea = ({ control, name, ...props }) => {
  const { field } = useController({
    control,
    name: name,
    defaultValue: "",
  });
  return (
    <>
      <label
        htmlFor={props.name}
        className="flex items-center cursor-pointer custom-radio"
      >
        <input
          type="radio"
          {...field}
          {...props}
          className="hidden"
          checked={props.checked}
        />
        <div className="w-full h-full rounded-full bg-red"></div>
      </label>
      {props.checked && <textarea name={name}></textarea>}
    </>
  );
};

export default InputRadioTextArea;
