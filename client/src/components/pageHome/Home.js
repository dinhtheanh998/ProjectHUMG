import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import advdesign from "../../assets/adv_design.svg";
import advtruck from "../../assets/adv_truck.svg";
import advcert from "../../assets/adv_cert.svg";
import advgeo from "../../assets/adv_geo.svg";
import { Outlet } from "react-router-dom";
import _debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import Product from "../Product/Product";
import SlideHeaderHome from "../SlideHeaderHome";
import CatelistIcon from "./Catelist";

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
  console.log("List Product", products);
  // useEffect(() => {
  //   axios.get(`api/category/getlimitCate/limit=0`).then((response) => {
  //     setCateData(response.data);
  //   });
  // }, []);

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
        <CatelistIcon handleSearchByCate={handleSearchByCate}></CatelistIcon>
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
      <div className="flex items-center justify-center my-5 page-container gap-x-10">
        <div className="relative flex justify-center overflow-hidden cursor-pointer group">
          <div className="wrap-img-cate w-[200px] h-[200px] rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1604006852748-903fccbc4019?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
              className="object-cover w-full h-full rounded-lg "
            />
            <div className="absolute inset-0 hidden transition-all bg-black opacity-20 group-hover:block"></div>
          </div>
          <span className="absolute px-6 py-2 w-[60%] top-full group-hover:top-2/4 group-hover:-translate-y-2/4 bg-transparent border-2 border-white text-white font-semibold uppercase transition-all text-center rounded-lg hover:bg-blue-gray-300">
            For Him
          </span>
        </div>
        <div className="relative flex justify-center overflow-hidden cursor-pointer group">
          <div className="wrap-img-cate w-[200px] h-[200px] rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1578102718171-ec1f91680562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="absolute inset-0 hidden transition-all bg-black opacity-20 group-hover:block"></div>
          <span className="absolute px-6 py-2 w-[60%] top-full group-hover:top-2/4 group-hover:-translate-y-2/4 bg-transparent border-2 border-white text-white font-semibold uppercase transition-all text-center rounded-lg hover:bg-blue-gray-300">
            For Her
          </span>
        </div>
      </div>
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
      {/* adv */}
      <div className="my-[100px] gap-x-10 pt-10 border-t border-gray-300">
        <div className="flex items-center justify-between page-container">
          <div className="flex flex-col justify-center">
            <div className="advan__item w-[150px]">
              <img src={advdesign} alt="" className="h-[150px]" />
            </div>
            <span className="text-lg font-semibold">Thiết kế đa dạng</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="advan__item w-[150px]">
              <img src={advtruck} alt="" className="h-[150px]" />
            </div>
            <span className="text-lg font-semibold">Giao hàng nhanh</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="advan__item w-[150px]">
              <img src={advcert} alt="" className="h-[150px]" />
            </div>
            <span className="text-lg font-semibold">Bảo vệ quyền lợi</span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="advan__item w-[150px]">
              <img src={advgeo} alt="" className="h-[150px]" />
            </div>
            <span className="text-lg font-semibold">Giao hàng toàn quốc</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
