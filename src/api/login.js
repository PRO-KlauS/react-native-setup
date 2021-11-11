import { post } from "../setup/client";

const login = (body) => {
  return post("Login/Authenticate", body);
};

export { login };
