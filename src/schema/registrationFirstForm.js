import * as Yup from "yup";
import { constants } from "../constants";

const { regex } = constants;
export default (t) =>
  Yup.object({
    firstName: Yup.string()
      .required(t("validationMessages.required"))
      .matches(regex.name, t("validationMessages.onlyChars")),
    lastName: Yup.string()
      .required(t("validationMessages.required"))
      .matches(regex.name, t("validationMessages.onlyChars")),
    dob: Yup.date(t("validationMessages.required")).required(
      t("validationMessages.required")
    ),
    mobileNumber: Yup.string()
      .required(t("validationMessages.required"))
      .matches(regex.mobile, t("validationMessages.validMobile")),
    secondaryMobileNo: Yup.string().matches(
      regex.mobile,
      t("validationMessages.validMobile")
    ),
    password: Yup.string()
      .required(t("validationMessages.required"))
      .min(6, t("validationMessages.atLeast6Chars"))
      .max(12, t("validationMessages.max12Chars")),
    confirmPassword: Yup.string()
      .required(t("validationMessages.required"))
      .oneOf([Yup.ref("password")], t("validationMessages.bothPasswordSame")),
  });
