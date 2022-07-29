import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Product from "../Product/Product";
const Home = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <div className="grid grid-cols-4 gap-x-6">
      {products &&
        products.length > 0 &&
        products.map((product) => {
          return <Product data={product} key={product._id}></Product>;
        })}
      
    </div>
  );
};

export default Home;
