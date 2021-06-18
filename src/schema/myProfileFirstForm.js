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
    secondaryMobileNo: Yup.string().matches(
      regex.mobile,
      t("validationMessages.validMobile")
    ),
  });
