import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../Product/Product";
import { v4 as uuidv4 } from "uuid";
import ProductPageItem from "./ProductPageItem";
import InputCheckbox from "../../customForm/InputCheckbox";
import { useForm } from "react-hook-form";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productsByPrice, setProductsByPrice] = useState();
  const [checked, setChecked] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios.get("/api/products/getAllProduct").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleChoosePrice = async (e) => {
    console.log(e.target.value);
    const data = await axios.get(
      `/api/products/getAllByPrice/maxPrice=${e.target.value}`
    );
    setProductsByPrice(data.data);
  };
  const handleChooseCategory = async (e) => {
    if (checked.includes(e.target.dataset.value)) { 
      setChecked(checked.filter((item) => item !== e.target.dataset.value));
    } else {
      setChecked((prev) => [...prev, e.target.dataset.value]);      
    }
  };
  console.log(checked);
  return (
    <div className="grid grid-cols-12 page-container">
      <div className="col-start-1 col-end-4">
        <div className="pb-4 border-b border-gray-300 select-price">
          <div name="" id="" className="flex flex-col text-lg font-semibold">
            <label className="relative flex items-center gap-x-5">
              <input
                type="radio"
                name="price"
                id="price200"
                value={120000}
                className="cursor-pointer radio-price"
                onChange={handleChoosePrice}
                hidden
              ></input>
              <span className="inline-block w-[15px] h-[15px] mr-2 border border-gray-400 rounded-full"></span>
              <span className="cursor-pointer">Nhỏ hơn 150000</span>
            </label>
            <label className="relative flex items-center gap-x-5">
              <input
                type="radio"
                name="price"
                id="price500"
                value={500000}
                className="cursor-pointer radio-price"
                onChange={handleChoosePrice}
                hidden
              ></input>
              <span className="inline-block w-[15px] h-[15px] mr-2 border border-gray-400 rounded-full"></span>
              <span className="cursor-pointer">Nhỏ hơn 500000</span>
            </label>
            <label className="relative flex items-center gap-x-5">
              <input
                type="radio"
                name="price"
                id="price700"
                value={700000}
                className="cursor-pointer radio-price"
                onChange={handleChoosePrice}
                hidden
              ></input>
              <span className="inline-block w-[15px] h-[15px] mr-2 border border-gray-400 rounded-full"></span>
              <span className="cursor-pointer">Nhỏ hơn 700000</span>
            </label>
            <label className="relative flex items-center gap-x-5">
              <input
                type="radio"
                name="price"
                id="price200"
                value={999999999999999999}
                className="cursor-pointer radio-price"
                onChange={handleChoosePrice}
                hidden
              ></input>
              <span className="inline-block w-[15px] h-[15px] mr-2 border border-gray-400 rounded-full"></span>
              <span className="cursor-pointer">Tất cả</span>
            </label>
          </div>
        </div>
        {/* select width category */}
        <div className="py-4 border-b border-gray-300 select-cate">
          {/* <div class="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label
              for="default-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-semibold"
            >
              POLO
            </label>
          </div> */}
          <InputCheckbox
            control={control}
            name="term"
            id="term"
            text="Polo"
            data-value="Polo"
            checked={checked.includes("Polo")}
            onChange={handleChooseCategory}
          ></InputCheckbox>
          <InputCheckbox
            control={control}
            name="thun"
            id="thun"
            text="Áo thun"
            data-value="Áo thun"
            checked={checked.includes("Áo thun")}
            onChange={handleChooseCategory}
          ></InputCheckbox>
          <InputCheckbox
            control={control}
            name="jean"
            id="jean"
            text="Quần jean"
            data-value="Jean"
            checked={checked.includes("Jean")}
            onChange={handleChooseCategory}
          ></InputCheckbox>
          
        </div>
      </div>
      <div className="col-start-5 col-end-13">
        <div className="grid grid-cols-3 gap-x-2">
          {!productsByPrice &&
            products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <ProductPageItem
                  data={product}
                  key={uuidv4()}
                ></ProductPageItem>
              );
            })}
          {productsByPrice &&
            productsByPrice.length > 0 &&
            productsByPrice.map((product) => (
              <ProductPageItem data={product} key={uuidv4()}></ProductPageItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
