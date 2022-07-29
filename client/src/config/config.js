import axios from "axios";
import { toast } from "react-toastify";

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
export const notify = () =>
  toast.success("Thêm thành công", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
