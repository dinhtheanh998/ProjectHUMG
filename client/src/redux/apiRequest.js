import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/admin");
  } catch (error) {
    // const res = await axios.post("/api/auth/login", user);
    // dispatch(loginFailed(res));
    return error.response.data;
  }
};
