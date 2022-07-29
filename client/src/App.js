import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BaseAdmin from "./components/admin/BaseAdmin";
import CategoryAdmin from "./components/admin/categoryAdmin/CategoryAdmin";
import HomeAdmin from "./components/admin/HomeAdmin/HomeAdmin";
import OrderAdmin from "./components/admin/OrderAdmin";
import CreateProduct from "./components/admin/productAdmin/CreateProduct";
import CreateProductDetailAdmin from "./components/admin/productAdmin/CreateProductDetailAdmin";
import ProductAdmin from "./components/admin/productAdmin/ProductAdmin";
import ProductDetailsAdmin from "./components/admin/productAdmin/ProductDetailsAdmin";
import ViewProductDetails from "./components/admin/productAdmin/ViewProductDetails";
import Cart from "./components/Cart/Cart";
import CategoryForm from "./components/form/Category/CategoryForm";
import Product from "./components/form/Product/Product";
import Base from "./components/pageBase/Base";
import Home from "./components/pageHome/Home";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
  return (
    <Fragment>
      <Routes>
        {/* Client Side */}
        <Route path="/" element={<Base></Base>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/san-pham" element={<Product></Product>}></Route>
          <Route
            path="/san-pham/:sanphamid"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
        </Route>
        <Route path="/admin" element={<BaseAdmin></BaseAdmin>}>
          <Route index element={<HomeAdmin></HomeAdmin>}></Route>
          <Route path="home" element={<HomeAdmin></HomeAdmin>}></Route>
          <Route
            path="product-Admin"
            element={<ProductAdmin></ProductAdmin>}
          ></Route>
          <Route
            path="product-Admin/add-product"
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route
            path="ProductDetailsAdmin"
            element={<ProductDetailsAdmin></ProductDetailsAdmin>}
          >            
          </Route>
          <Route
              path="ProductDetailsAdmin/:infoId"
              element={<ViewProductDetails></ViewProductDetails>}
            ></Route>
          <Route
            path="ProductDetailsAdmin/add-productDetails"
            element={<CreateProductDetailAdmin></CreateProductDetailAdmin>}
          ></Route>
          <Route
            path="CategoryAdmin"
            element={<CategoryAdmin></CategoryAdmin>}
          ></Route>
          <Route
            path="CategoryAdmin/add-category"
            element={<CategoryForm></CategoryForm>}
          ></Route>
          <Route path="OrderAdmin" element={<OrderAdmin></OrderAdmin>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
