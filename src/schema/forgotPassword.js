import * as Yup from "yup";

export default (t) =>
  Yup.object({
    mobileNo: Yup.number()
      .typeError(t("validationMessages.onlyNumbers"))
      .integer(t("validationMessages.onlyNumbers"))
      .required(t("validationMessages.required"))
      .min(1000000000, t("validationMessages.validMobile"))
      .max(9999999999, t("validationMessages.validMobile")),
  });
