import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { notifySuccess } from "../../../config/config";
import DropDownCustom from "../../customForm/DropDownCustom";
import { v4 as uuidv4 } from "uuid";
const schema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm không được để trống"),
  unitPrice: yup
    .number()
    .required("Giá sản phẩm không được trống")
    .typeError("Giá sản phẩm phải là số"),
  unitPromotionalPrice: yup
    .number()
    .required("Giá sản phẩm không được trống")
    .typeError("Giá khuyến mại phải là số")
    .lessThan(yup.ref("unitPrice"), "Phải nhỏ hơn giá"),
  description: yup.string().required("Vui lòng nhập mô tả sản phẩm"),
});

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    width: "auto !important",
    // padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    border: "1px solid #ccc",
    display: "flex",
    width: "100%",
    borderRadius: "8px",
    padding: "4px 0",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
  valueContainer: () => {
    return {
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "nowrap",
      paddingLeft: "10px",
      overflow: "auto",
    };
  },
  indicatorsContainer: () => {
    return {
      marginLeft: "auto",
      display: "flex",
    };
  },
};
const handleData = (data) =>
  data?.map((item) => {
    return { value: item._id, label: item.name };
  });
const animatedComponents = makeAnimated();

const fakeData2 = [
  {
    name: "Thủy Hử",
    phone: "09176231263",
    _id: "ncc1",
  },
  {
    name: "Quần áo Mới",
    phone: "09176231263",
    _id: "ncc2",
  },
  {
    name: "Quần áo cũ 2",
    phone: "09176231263",
    _id: "ncc3",
  },
  {
    name: "Quần áo mới 2",
    phone: "09176231263",
    _id: "ncc4",
  },
];

const EditProduct = () => {
  let fileArray = [];
  let fileObj = [];
  const { productid } = useParams();
  const [dataAProduct, setDataAProduct] = useState();
  const [cateData, setCateData] = useState();
  const [selectCate, setSelectCate] = useState();
  const [imgData, setImgData] = useState(null);
  const [defaultImg, setDefaultImg] = useState(null);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const {
    control,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // mode: "onBlur",
  });

  const onChangePicture = (e) => {
    setImage([...e.target.files]);
    if (e.target.files) {
      // setImage(e.target.files[0]);
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      // file.preview = URL.createObjectURL(file);
      setDefaultImg(fileArray);
    }
    // console.log([...e.target.files]);
    // if (e.target.files) {
    //   // setImage(e.target.files[0]);
    //   const file = e.target.files[0];
    //   file.preview = URL.createObjectURL(file);
    //   // setImgData(file);
    //   setDefaultImg(null)
    // }
  };

  const pushImgData = (e) => {
    if (e.target.files) {
      setImage((prev) => [...prev, ...e.target.files]);
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      setDefaultImg((prev) => [...prev, ...fileArray]);
    }
  };
  // const value = image.some((item) => typeof item === "object");
  // console.log(value);
  // console.log('defaultImg', defaultImg)
  // console.log('image', image)
  useEffect(() => {
    axios.get(`/api/products/${productid}`).then((res) => {
      setDataAProduct(res.data);
      console.log("data", res.data);
      // console.log([...res.data.images]);
      setDefaultImg(res.data.images);
      setImage([...res.data.images]);
      setSelectCate(res.data.categories);
    });
  }, [productid]);

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCateData(res.data);
    });
  }, []);
  const handleOnSubmit = (data) => {
    const formData = new FormData();

    selectCate.forEach((item) => {
      formData.append("categories", JSON.stringify(item));
    });

    // const result = selectCate.map((item) => JSON.stringify(item));
    // console.log(result);
    // formData.append("categories", result);
    if (!image) {
      formData.append("name", data.name);
      formData.append("unitPrice", data.unitPrice);
      formData.append("unitPromotionalPrice", data.unitPromotionalPrice);
      formData.append("description", data.description);
      // formData.append("categories", data.categories);
    } else {
      console.log(image);
      image.forEach((item) => {
        formData.append("images", item);
      });
      // for (let i = 0; i < image.length; i++) {
      //   formData.append("images", image[i]);
      // }
      formData.append("name", data.name);
      formData.append("unitPrice", data.unitPrice);
      formData.append("unitPromotionalPrice", data.unitPromotionalPrice);
      // formData.append("images", image);
      formData.append("description", data.description);
      // formData.append("categories", data.categories);
    }

    axios.put(`/api/products/${productid}`, formData).then((res) => {
      if (res.status === 200) notifySuccess("Sửa sản phẩm thành công");
      // setTimeout(() => {
      //   navigate("/admin/product-Admin");
      // }, 1500);
    });

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
  };
  return (
    <>
      {dataAProduct && (
        <form
          className="px-10 py-4 bg-white rounded-xl"
          onSubmit={handleSubmit(handleOnSubmit)}
          encType=""
        >
          <h2 className="pb-2 text-2xl font-semibold border-b border-gray-400">
            Sửa sản phẩm
          </h2>
          <div className="flex flex-col mt-5 mb-5 gap-y-3">
            <label htmlFor="name">Tên sản phẩm</label>
            <input
              type="text"
              id="name"
              defaultValue={dataAProduct.name}
              {...register("name")}
              className={`px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400 ${
                errors.name?.message ? "border-red-400" : ""
              }`}
              placeholder="Tên sản phẩm"
            />
            <p className="text-sm text-red-500">{errors.name?.message}</p>
          </div>
          <div className="flex mb-5 gap-x-3">
            <div className="flex flex-col mb-5 gap-y-3">
              <label htmlFor="unitPrice">Giá sản phẩm</label>
              <input
                type="text"
                id="unitPrice"
                defaultValue={dataAProduct.unitPrice}
                {...register("unitPrice")}
                className="px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400"
                placeholder="Giá sản phẩm"
              />
              <p className="text-sm text-red-500">
                {errors.unitPrice?.message}
              </p>
            </div>
            <div className="flex flex-col mb-5 gap-y-3">
              <label htmlFor="">Giá khuyến mại</label>
              <input
                type="text"
                name="name"
                defaultValue={dataAProduct.unitPromotionalPrice}
                {...register("unitPromotionalPrice")}
                className="px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400"
                placeholder="Giá khuyến mại"
              />
              <p className="text-sm text-red-500">
                {errors.unitPromotionalPrice?.message}
              </p>
            </div>
            <div className="flex flex-col flex-1 w-1/4 mb-5 gap-y-3">
              <label htmlFor="">Loại sản phẩm</label>
              <Select
                // defaultValue={["colourOptions[2]", "colourOptions[3]"]}
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={dataAProduct.categories}
                isMulti
                options={handleData(cateData)}
                onChange={setSelectCate}
                styles={customStyles}
              />
            </div>
            <div className="flex flex-col mb-5 gap-y-3">
              <label htmlFor="">Nhà cung cấp</label>
              <DropDownCustom
                control={control}
                data={fakeData2}
                dropDownLabel="Chọn nhà cung cấp"
                setValue={setValue}
                name="supplies"
              ></DropDownCustom>
            </div>
          </div>
          <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="" className="cursor-pointer">
              Ảnh sản phẩm
            </label>
            {!imgData && !defaultImg && (
              <label
                htmlFor="images"
                className="flex items-center justify-center px-5 py-3 border-2 border-gray-300 border-dotted cursor-pointer rounded-xl gap-x-2"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span>Chọn hình ảnh</span>
                <input
                  type="file"
                  id="images"
                  className="invisible opacity-0"
                  onChange={onChangePicture}
                  // {...register("images")}
                />
              </label>
            )}
            {/* preview image */}
            {(defaultImg || imgData) && (
              <div className="mb-5 w-[100%] select-none relative group">
                <div className="flex items-center w-full h-full gap-x-4">
                  {defaultImg.map((item, index) => {
                    return (
                      <div
                        className="w-[100px] h-[100px] relative"
                        key={uuidv4()}
                      >
                        <img
                          src={`${
                            item.includes("blob:http:")
                              ? item
                              : `/images/${item}`
                          }`}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                        <span
                          className="absolute w-[40px] h-[40px] rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-slate flex items-center justify-center text-2xl font-semibold z-10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                          onClick={() => {
                            // setImgData(null);
                            // console.log(index)
                            image.splice(index, 1);
                            defaultImg.splice(index, 1);
                            setDefaultImg((prev) => [...prev]);
                            console.log(image);
                            setImage((prev) => [...prev]);
                            console.log("image", image);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </span>
                        <div className="absolute inset-0 transition-all bg-white opacity-0 overlay-preview-img group-hover:opacity-50"></div>
                      </div>
                    );
                  })}
                  <label
                    htmlFor="pushImgData"
                    className="w-[100px] h-[100px] border cursor-pointer border-dashed border-gray-400 flex items-center justify-center hover:border-solid hover:border-blue-400 transition-all"
                  >
                    <input
                      id="pushImgData"
                      type="file"
                      multiple
                      onChange={pushImgData}
                      hidden
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                </div>
              </div>
            )}

            <p className="text-sm text-red-500">{errors.images?.message}</p>
          </div>

          <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="description">Mô tả sản phẩm</label>
            <textarea
              id="description"
              defaultValue={dataAProduct.description}
              {...register("description")}
              className="border border-gray-300 rounded-xl resize-none min-h-[200px] focus:border-blue-400 outline-none p-4"
              placeholder="Mô tả sản phẩm"
            />
          </div>
          <div className="flex items-center gap-x-10">
            <button
              type="button"
              className="flex items-center justify-center button-primary gap-x-3"
              onClick={() => {
                navigate("/admin/product-Admin");
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>Quay lại</span>
            </button>
            <button className="flex items-center justify-center button-primary gap-x-3">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>Xác nhận</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditProduct;
