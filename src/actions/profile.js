import { getProfile, updateProfile } from "../api/profile";

const SET_PROFILE_DATA = "SET_PROFILE_DATA";
const setProfileData = () => (dispatch, getState) => {
  return getProfile(getState().user.driverId).then((res) => {
    if (res.data.success === true) {
      dispatch(profileDataAction(res.data.data.driver));
    }
  });
};

const updateProfileData = (body) => (dispatch, getState) => {
  return updateProfile(body, getState().user.driverId).then((res) => {
    if (res.data.success === true) {
      dispatch(profileDataAction(res.data.data));
    }
    return res;
  });
};

const profileDataAction = (data) => ({
  type: SET_PROFILE_DATA,
  payload: data,
});

export {
  setProfileData,
  updateProfileData,
  profileDataAction,
  SET_PROFILE_DATA,
};
