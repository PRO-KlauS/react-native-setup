import { post } from "../setup/client";

const register = (body) => {
  return post("Driver/AddDriverAndEV", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { register };
