import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../Product/Product";
import { v4 as uuidv4 } from "uuid";
import ProductPageItem from "./ProductPageItem";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productsByPrice, setProductsByPrice] = useState();
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

  return (
    <div className="grid grid-cols-12 page-container">
      <div className="col-start-1 col-end-4">
        <div className="select-price">
          <div name="" id="" className="flex flex-col text-xl font-semibold">
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
      </div>
      <div className="col-start-5 col-end-13">
        <div className="grid grid-cols-4">
          {!productsByPrice && products &&
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
