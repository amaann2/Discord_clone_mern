import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const authAction = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authAction.SET_USER_DETAILS,
    userDetails,
  };
};
const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const res = await api.login(userDetails);
    console.log(res);
    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response.data));
    } else {
      console.log(res.data);
      const { userDetails } = res?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));

      navigate("/dashboard");
    }
  };
};
const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const res = await api.register(userDetails);

    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response.data));
    } else {
      console.log(res.data);
      const { userDetails } = res?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));

      navigate("/dashboard");
    }
  };
};
