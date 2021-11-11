import { post } from "../setup/client";

const resetPassword = (body) => {
  return post("Login/ResetPassword", body);
};

export { resetPassword };
