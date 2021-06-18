import * as Yup from "yup";
import { constants } from "../constants";

const { regex } = constants;
export default (t) =>
  Yup.object({
    mobile: Yup.string()
      .required(t("validationMessages.required"))
      .matches(regex.mobile, t("validationMessages.validMobile")),
    password: Yup.string()
      .required(t("validationMessages.required"))
      .min(6, t("validationMessages.atLeast6Chars"))
      .max(12, t("validationMessages.max12Chars")),
  });
