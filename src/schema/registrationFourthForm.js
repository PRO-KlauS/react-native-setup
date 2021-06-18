import * as Yup from "yup";
// import { constants } from "../constants";

// const { regex } = constants;
export default (t) =>
  Yup.object({
    chassisNumber: Yup.string().required(t("validationMessages.required")),
  });
