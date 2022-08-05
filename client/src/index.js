import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login-Logout/Login";
import Base from "./components/pageBase/Base";
import { CartProvider } from "./context/Cartcontext";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import  { store,persistor } from "./redux/store";
import Request from "./components/requestClient/Request";
import ReturnRequest from "./components/requestClient/ReturnRequest";
import { ThemeProvider } from "@material-tailwind/react";
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>        
      <CartProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </BrowserRouter>
        </ThemeProvider>
        </CartProvider>
    </PersistGate>        
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
