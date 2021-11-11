import { login } from "../api/login";
// import { setProfileData } from "./profile";
import { saveToken, removeToken } from "../utility";
// import { fcmService } from "../utility/fcmService";

const SET_USER_DATA = "SET_USER_DATA";
const LOGOUT = "LOGOUT";

const setUserData = (body) => (dispatch) => {
  return login(body).then((res) => {
    if (res.data.success === true) {
      dispatch({
        type: SET_USER_DATA,
        payload: {
          ...(res.data.user || {}),
          token: `${res.data.user?.token}`,
        },
      });
      saveToken(`${res.data.user?.token}`);
      // dispatch(setProfileData());
      return res.data;
    }
    return res.data;
  });
};

const loginAction = (res) => {
  return (dispatch) =>
    dispatch({
      type: SET_USER_DATA,
      payload: { ...res.data.user, token: `Bearer ${res.data.token}` },
    });
};

const logout = () => {
  return (dispatch) => {
    // fcmService.deleteToken();
    removeToken();
    dispatch({ type: "LOGOUT", payload: {} });
  };
};

export { setUserData, logout, loginAction, SET_USER_DATA, LOGOUT };
