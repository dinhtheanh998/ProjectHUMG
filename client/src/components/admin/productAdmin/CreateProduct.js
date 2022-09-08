import { yupResolver } from "@hookform/resolvers/yup";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DropDownCustom from "../../customForm/DropDownCustom";
import { v4 as uuidv4 } from "uuid";
const notify = () =>
  toast.success("Thêm thành công", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const handleData = (data) =>
  data?.map((item) => {
    return { value: item._id, label: item.name };
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

const animatedComponents = makeAnimated();
// validate form

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

const CreateProduct = () => {
  let fileArray = [];
  let fileObj = [];
  const [imgData, setImgData] = useState(null);
  const [image, setImage] = useState();
  const [cateData, setCateData] = useState();
  const [selectCate, setSelectCate] = useState();
  const [excelFile, setExcelFile] = useState();
  const navigate = useNavigate();

  const onChangePicture = (e) => {
    setImage([...e.target.files]);
    if (e.target.files) {
      // setImage(e.target.files[0]);
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      // file.preview = URL.createObjectURL(file);
      setImgData(fileArray);
    }
  };
  const pushImgData = (e) => {
    if (e.target.files) {
      setImage((prev) => [...prev, ...e.target.files]);
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      setImgData((prev) => [...prev, ...fileArray]);
    }
  };
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

  useEffect(() => {
    axios.get("/api/category").then((res) => {
      setCateData(res.data);
    });
  }, []);

  const handleOnSubmit = (data) => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }
    
    selectCate.forEach((item) => {
      formData.append("categories", JSON.stringify(item));
    });

    formData.append("name", data.name);
    formData.append("unitPrice", data.unitPrice);
    formData.append("unitPromotionalPrice", data.unitPromotionalPrice);
    // formData.append("images", image);
    formData.append("description", data.description);
    axios.post("/api/products", formData).then((res) => {
      if (res.status === 200) notify();
      setTimeout(() => {
        navigate("/admin/product-Admin");
      }, 1500);
    });
    // console.log({ ...data, categories: selectCate });
    console.log(formData.getAll("categories"));
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
  };
  const handleImportExcel = (e) => {
    e.preventDefault();
    console.log(excelFile);
    const formData = new FormData();
    formData.append("upFileExcel", excelFile);
    axios.post("/api/products/importExcel", formData).then((res) => {
      console.log(res);
    });
  };
  // console.log("imgData", imgData);
  // console.log("cate", cateData);
  return (
    <>
      {/* Import */}
      <form onSubmit={handleImportExcel}>
        <label
          htmlFor="importExcel"
          className="flex items-center px-6 py-2 mb-4 font-semibold text-white bg-pink-400 rounded-lg cursor-pointer select-none gap-x-3"
        >
          <span>
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <rect fill="none" height="256" width="256" />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                x1="152"
                x2="208"
                y1="96"
                y2="96"
              />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                x1="152"
                x2="208"
                y1="160"
                y2="160"
              />
              <path
                d="M64,72V40a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H72a8,8,0,0,1-8-8V184"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
              />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                x1="136"
                x2="136"
                y1="184"
                y2="224"
              />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                x1="136"
                x2="136"
                y1="32"
                y2="72"
              />
              <rect
                fill="none"
                height="112"
                rx="8"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                width="120"
                x="32"
                y="72"
              />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                x1="74"
                x2="110"
                y1="104"
                y2="152"
              />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                x1="110"
                x2="74"
                y1="104"
                y2="152"
              />
            </svg>
          </span>
          <span>Import</span>
          <input
            type="file"
            id="importExcel"
            name="upFileExcel"
            hidden
            onChange={(e) => {
              setExcelFile(e.target.files[0]);
            }}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="px-3 py-2 bg-red-300 border border-gray-300"
        />
      </form>

      <form
        className="px-10 py-4 bg-white rounded-xl"
        onSubmit={handleSubmit(handleOnSubmit)}
        encType=""
      >
        <h2 className="pb-2 text-2xl font-semibold border-b border-gray-400">
          Thêm sản phẩm
        </h2>
        <div className="flex flex-col mt-5 mb-5 gap-y-3">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400 ${
              errors.name?.message ? "border-red-400" : ""
            }`}
            placeholder="Tên sản phẩm"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="flex mb-5 gap-x-3">
          <div className="flex flex-col flex-1 mb-5 gap-y-3">
            <label htmlFor="unitPrice">Giá sản phẩm</label>
            <input
              type="text"
              id="unitPrice"
              {...register("unitPrice")}
              className="px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400"
              placeholder="Giá sản phẩm"
            />
            <p className="text-sm text-red-500">{errors.unitPrice?.message}</p>
          </div>
          <div className="flex flex-col flex-1 mb-5 gap-y-3">
            <label htmlFor="">Giá khuyến mại</label>
            <input
              type="text"
              name="name"
              {...register("unitPromotionalPrice")}
              className="px-6 py-3 border border-gray-300 outline-none rounded-xl focus:border-blue-400"
              placeholder="Giá khuyến mại"
            />
            <p className="text-sm text-red-500">
              {errors.unitPromotionalPrice?.message}
            </p>
          </div>
          {/* <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="">Loại sản phẩm</label>
            <DropDownCustom
              control={control}
              data={cateData}
              dropDownLabel="Chọn loại"
              setValue={setValue}
              name="categories"
            ></DropDownCustom>
          </div> */}
          <div className="flex flex-col flex-1 w-1/4 mb-5 gap-y-3">
            <label htmlFor="">Loại sản phẩm</label>
            <Select
              // defaultValue={["colourOptions[2]", "colourOptions[3]"]}
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={handleData(cateData)}
              onChange={setSelectCate}
              styles={customStyles}
            />
          </div>
          <div className="flex flex-col flex-1 w-1/4 mb-5 gap-y-3">
            <label htmlFor="">Loại sản phẩm</label>
            <Select
              // defaultValue={["colourOptions[2]", "colourOptions[3]"]}
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
              isMulti
              options={handleData(cateData)}
              onChange={setSelectCate}
              styles={customStyles}
            />
          </div>
          {/* <div className="flex flex-col mb-5 gap-y-3">
            <label htmlFor="">Nhà cung cấp</label>
            <DropDownCustom
              control={control}
              data={fakeData2}
              dropDownLabel="Chọn nhà cung cấp"
              setValue={setValue}
              name="supplies"
            ></DropDownCustom>
          </div> */}
        </div>
        <div className="flex flex-col mb-5 gap-y-3">
          <label htmlFor="" className="cursor-pointer">
            Ảnh sản phẩm
          </label>
          {(!imgData || imgData.length === 0) && (
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
                multiple
                name="images"
                onChange={onChangePicture}
                // {...register("images")}
              />
            </label>
          )}
          {/* preview image */}
          {imgData && imgData.length > 0 && (
            <div className="mb-5 w-[100%] select-none relative group">
              <div className="flex items-center w-full h-full gap-x-4">
                {imgData.map((item, index) => {
                  return (
                    <div
                      className="w-[100px] h-[100px] relative"
                      key={uuidv4()}
                    >
                      <img
                        src={item}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                      <span
                        className="absolute w-[40px] h-[40px] rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-slate flex items-center justify-center text-2xl font-semibold z-10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        onClick={() => {
                          // setImgData(null);
                          // console.log(index)
                          imgData.splice(index, 1);
                          image.splice(index, 1);
                          setImgData((prev) => [...prev]);
                          setImage((prev) => [...prev]);
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
    </>
  );
};

export default CreateProduct;
