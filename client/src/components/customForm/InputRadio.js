import React from "react";
import { useController } from "react-hook-form";

const InputRadio = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.isAdmin,
  });
  return (
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
  );
};

export default InputRadio;
