import React from "react";
import { useController } from "react-hook-form";
const ImageUpload = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return <input type="file" {...props} {...field}></input>;
};

export default ImageUpload;
