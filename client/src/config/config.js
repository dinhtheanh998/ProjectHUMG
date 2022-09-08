import axios from "axios";
import { toast } from "react-toastify";

export const NOTPERMISSION = "Bạn không có quyền làm điều này";
export const DELETESUCCESS = "Xóa thành công";
const TIMEZONE = "+07:00"

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const converCurences = (number) => {
  return new Intl.NumberFormat("vi-VN").format(number);
};

export const getAllProduct = () => {
  return axios.get(`/api/products/`).then((res) => {
    return res.data;
  });
};

export const getAProduct = (proId) => {
  return axios.get(`/api/products/${proId}`).then((res) => {
    return res.data;
  });
};

export const getSizesProduct = (proId) => {
  return axios
    .get(`/api/productsInfo/product=${proId}&distinct=size`)
    .then((res) => {
      return res.data;
    });
};

export const getColorsProduct = (proId) => {
  return axios
    .get(`/api/productsInfo/product=${proId}&distinct=color`)
    .then((res) => {
      return res.data;
    });
};

export const getPriceByTime = (proId) => {
  return axios.get(`/api/order/test/testQuery/${proId}`).then((res) => { 
    return res.data
  })
}

export const notifySuccess = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  export const notifyWarn = (message) =>
  toast.warn(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  export const convertDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleString('vi');
}
  
export const getSearchResultPage = function (page, arr) {
  const start = (page - 1) * 10;
  const end = page * 10;
  return arr.slice(start, end);
};