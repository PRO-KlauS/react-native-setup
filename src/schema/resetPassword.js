import * as Yup from "yup";

export default (t) =>
  Yup.object({
    password: Yup.string()
      .required(t("validationMessages.required"))
      .min(6, t("validationMessages.atLeast6Chars"))
      .max(12, t("validationMessages.max12Chars")),
    confirmPassword: Yup.string()
      .required(t("validationMessages.required"))
      .oneOf([Yup.ref("password")], t("validationMessages.bothPasswordSame")),
  });
