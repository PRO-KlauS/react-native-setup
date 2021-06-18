import { post } from "./client";

const login = (body) => {
  return post("Login/Authenticate", body);
};

export { login };
