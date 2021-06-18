import { get, put } from "./client";

const getProfile = (userID) => {
  return get(`Driver/GetById/${userID}`);
};

const updateProfile = (body, userID) => {
  return put(`Driver/${userID}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const setAppVersion = (id, body) => {
  return put(`customers/${id}/update_app_version`, body);
};

export { getProfile, updateProfile, setAppVersion };
