import * as Yup from "yup";
import { constants } from "../constants";

const { regex } = constants;
export default (t) =>
  Yup.object({
    pincode: Yup.string()
      .required(t("validationMessages.required"))
      .matches(regex.pincode, t("validationMessages.validPincode")),
  });
