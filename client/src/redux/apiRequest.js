import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  clearUserList,
  deleteUserFailed,
  deleteUserStart,
  deleteUsersSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

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

export const registerUser = async (accessToken,user, dispatch,axiosJWT) => {
  console.log(user);
  dispatch(registerStart());
  try {
    await axiosJWT.post("/api/auth/register", user, 
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (token, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/api/user/", {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

// export const deleteUser = async (id, dispatch, token) => {
//   console.log("delete");
//   dispatch(deleteUserStart());
//   try {
//     console.log(id);
//     const res = await axios.delete("/api/user/" + id, {
//       headers: { token: `Bearer ${token}` },
//     });
//     dispatch(deleteUsersSuccess(res.data));
//   } catch (err) {
//     dispatch(deleteUserFailed(err.response.data));
//   }
// };

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete(`/api/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    const res = await axios.post("/api/auth/logout");
    dispatch(logOutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logOutFailed());
  }
};
