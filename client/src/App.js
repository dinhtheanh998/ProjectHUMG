import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManagerAccount from "./components/admin/accountAdmin/ManagerAccount";
import BaseAdmin from "./components/admin/BaseAdmin";
import CategoryAdmin from "./components/admin/categoryAdmin/CategoryAdmin";
import HomeAdmin from "./components/admin/HomeAdmin/HomeAdmin";
import OrderAdmin from "./components/admin/OrderAdmin/OrderAdmin";
import CreateProduct from "./components/admin/productAdmin/CreateProduct";
import CreateProductDetailAdmin from "./components/admin/productAdmin/CreateProductDetailAdmin";
import EditInfoProduct from "./components/admin/productAdmin/EditInfoProduct";
import EditProduct from "./components/admin/productAdmin/EditProduct";
import ProductAdmin from "./components/admin/productAdmin/ProductAdmin";
import ProductDetailsAdmin from "./components/admin/productAdmin/ProductDetailsAdmin";
import ViewProductDetails from "./components/admin/productAdmin/ViewProductDetails";
import ExchangeRequestAdmin from "./components/admin/RequestFromClient/ExchangeRequestAdmin";
import ReturnRequestAdmin from "./components/admin/RequestFromClient/ReturnRequestAdmin";
import Cart from "./components/Cart/Cart";
import CategoryForm from "./components/form/Category/CategoryForm";
import ProductPage from "./components/form/Product/ProductPage";
import Base from "./components/pageBase/Base";
import Home from "./components/pageHome/Home";
import ProductDetail from "./components/Product/ProductDetail";
import ManagerUser from "./components/ProfileUser/ManagerUser";
import OrderUser from "./components/ProfileUser/OrderUser";
import ProfileUser from "./components/ProfileUser/ProfileUser";
import ExchangeRequest from "./components/requestClient/ExchangeRequest";
import Request from "./components/requestClient/Request";
import ReturnRequest from "./components/requestClient/ReturnRequest";
import Task from "./components/Task";

function App() {
  return (
    <Fragment>
      <Routes>
        {/* Client Side */}
        <Route path="/" element={<Base></Base>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/trang-chu" element={<Home></Home>}></Route>
          <Route path="/san-pham" element={<ProductPage></ProductPage>}></Route>
          <Route
            path="/san-pham/:sanphamid"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="manager-user" element={<ManagerUser></ManagerUser>}>
            <Route
              path="profile-user"
              element={<ProfileUser></ProfileUser>}
            ></Route>
            <Route path="order-user" element={<OrderUser></OrderUser>}></Route>
          </Route>
          <Route
            path="chinh-sach-doi-tra"
            element={<Request></Request>}
          ></Route>
          <Route
            path="chinh-sach-doi-tra/tra-hang"
            element={<ReturnRequest></ReturnRequest>}
          ></Route>
          <Route
            path="chinh-sach-doi-tra/doi-hang"
            element={<ExchangeRequest></ExchangeRequest>}
          ></Route>
          <Route path="/task" element={<Task></Task>}></Route>
        </Route>
        {/* admin side */}
        <Route path="/admin" element={<BaseAdmin></BaseAdmin>}>
          <Route index element={<HomeAdmin></HomeAdmin>}></Route>
          <Route path="home" element={<HomeAdmin></HomeAdmin>}></Route>
          <Route
            path="product-Admin"
            element={<ProductAdmin></ProductAdmin>}
          ></Route>
          <Route
            path="edit-product/:productid"
            element={<EditProduct></EditProduct>}
          ></Route>
          <Route
            path="product-Admin/add-product"
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route
            path="ProductDetailsAdmin"
            element={<ProductDetailsAdmin></ProductDetailsAdmin>}
          ></Route>
          <Route
            path="ProductDetailsAdmin/:infoId"
            element={<ViewProductDetails></ViewProductDetails>}
          ></Route>

          <Route
            path="EditInfoProduct/:infoId"
            element={<EditInfoProduct></EditInfoProduct>}
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
          <Route
            path="returnRequest"
            element={<ReturnRequestAdmin></ReturnRequestAdmin>}
          ></Route>
          <Route
            path="exchangeRequest"
            element={<ExchangeRequestAdmin></ExchangeRequestAdmin>}
          ></Route>
          <Route
            path="account"
            element={<ManagerAccount></ManagerAccount>}
          ></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
