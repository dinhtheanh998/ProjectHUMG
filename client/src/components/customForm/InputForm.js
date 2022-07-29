import React from "react";
import { useController } from "react-hook-form";

const InputForm = ({ control, className, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className={`w-full py-2 px-4 transition-all bg-white border border-gray-400 outline-none focus:border-blue-600 ${className}`}
      {...field}
      {...props}
    ></input>
  );
};

export default InputForm;
