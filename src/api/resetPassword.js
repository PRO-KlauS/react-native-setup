import { post } from "./client";

const resetPassword = (body) => {
  return post("Login/ResetPassword", body);
};

export { resetPassword };
