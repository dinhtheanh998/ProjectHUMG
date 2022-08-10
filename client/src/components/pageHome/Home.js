import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import _debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import Product from "../Product/Product";
import SlideHeaderHome from "../SlideHeaderHome";

const Home = () => {
  const [products, setProducts] = useState();
  const [searchData, setSearchData] = React.useState("");
  const [cateData, setCateData] = React.useState("");
  const [showCateLimit, setShowCateLimit] = React.useState(false);
  useEffect(() => {
    axios.get("/api/products/getAllProduct").then((response) => {
      setProducts(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`api/category/getlimitCate/limit=0`).then((response) => {
      setCateData(response.data);
    });
  }, []);

  const fetchDataWithSearch = (key) => {
    axios.get(`/api/products/getProductByQuery/query=${key}`).then((res) => {
      setSearchData(res.data);
    });
  };
  const debounceDropDown = useCallback(
    _debounce((nextValue) => fetchDataWithSearch(nextValue), 1000),
    []
  );

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setSearchData("");
    }
    debounceDropDown(e.target.value);
  };
  const handleSearchByCate = async (e) => {
    // console.log(e.target);
    const data = await axios.get(
      `/api/products/getAllByCategory/cateId=${e.target.dataset.value}`
    );
    // console.log(data);
    setSearchData(data.data);
  };
  return (
    <>
      {/* .slice(0, showCateLimit ? 1 : cateData.length) */}
      <div className="flex items-center justify-between mb-5 page-container">
       
        <div
          className={`flex items-center gap-x-6 wrap-catelist ${
            showCateLimit ? "open" : ""
          }`}
        >
          {cateData &&
            cateData.map((cate) => (
              <span
                data-value={cate._id}
                className="px-5 py-2 font-semibold border border-gray-300 rounded-lg cursor-pointer whitespace-nowrap"
                onClick={handleSearchByCate}
                key={uuidv4()}
              >
                {cate.name}
              </span>
            ))}
        </div>
        <div className="flex items-center mr-auto">
          {!showCateLimit && (
            <label
              htmlFor="checkCate"
              className="cursor-pointer"
              onClick={() => {
                setShowCateLimit(true);
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </label>
          )}

          {showCateLimit && (
            <label
              htmlFor="cateC"
              className="cursor-pointer"
              onClick={() => {
                setShowCateLimit(false);
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </label>
          )}
        </div>

        <div className="text-center min-w-[400px] flex items-center">
          <span className="mr-3 font-semibold">Tìm kiếm:</span>
          <input
            type="search"
            className="flex-1 px-4 py-3 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-blue-400"
            id="exampleSearch"
            placeholder="Nhập sản phẩm cần tìm"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {!searchData && <SlideHeaderHome></SlideHeaderHome>}

      <div className="grid grid-cols-4 gap-x-6 page-container">
        {!searchData &&
          products &&
          products.length > 0 &&
          products.map((product) => {
            return <Product data={product} key={uuidv4()}></Product>;
          })}
        {searchData &&
          searchData.length > 0 &&
          searchData.map((item, index) => {
            return <Product data={item} key={uuidv4()}></Product>;
          })}
      </div>
    </>
  );
};

export default Home;
