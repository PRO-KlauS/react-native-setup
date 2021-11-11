import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { getToken, showToast, getAPIBaseURL } from "../utility/index";
import i18nInstance from "./i18next";
import { logout } from "../actions/login";
import store from "./store";

const baseURL = getAPIBaseURL();
const baseURLWithAPI = `${baseURL}/api/`;

const client = axios.create({
  baseURL: baseURLWithAPI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const get = (url, body, headers = {}) =>
  client.get(url, { params: body, headers });

const post = (url, body, headers = {}) => client.post(url, body, { headers });

const put = (url, body, headers = {}) => client.put(url, body, { headers });

const patch = (url, body, headers = {}) => client.patch(url, body, { headers });

const del = (url, body, headers = {}) =>
  client.delete(url, { params: body, headers });

client.interceptors.request.use(async (config) => {
  config.headers.Authorization = await getToken();
  // config.params = {
  //   ...(config.params || {}),
  //   locale: i18nInstance.language || "en",
  // };
  return config;
});

client.interceptors.response.use(
  function (response) {
    if (response.data?.logout) {
      store.dispatch(logout()); // For auto logout on password change
      showToast(i18nInstance.t("messages.sessionExpired"));
      return {
        ...response,
        data: { ...response.data, successMessage: "", errorMessage: "" },
      };
    }
    return response;
  },
  function (error) {
    NetInfo.fetch().then((state) => {
      state.isConnected && showToast(i18nInstance.t("messages.tryAgain"));
    });
    return Promise.reject(error);
  },
);

export { get, post, put, del, patch, baseURL, baseURLWithAPI };

export default client;
