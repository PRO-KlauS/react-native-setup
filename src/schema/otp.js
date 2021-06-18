import * as Yup from "yup";

export default (t) =>
  Yup.object({
    otp: Yup.string()
      .required(t("validationMessages.required"))
      .matches(/^\d{6}$/, t("validationMessages.validOTP")),
  });
