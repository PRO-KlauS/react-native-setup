import { post } from "./client";

const sendOTP = (body) => {
  return post("Home/SendOtp", body);
};

const verifyOTP = (body) => {
  return post("Home/VerifyOtp", body);
};

export { sendOTP, verifyOTP };
