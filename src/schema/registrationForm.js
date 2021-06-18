import * as Yup from "yup";

// const { regex } = constants;
export default (t) =>
  Yup.object({
    // firstName: Yup.string()
    //   .required('Required.')
    //   .matches(regex.name, 'Numbers and special characters are not allowed.'),
    // lastName: Yup.string()
    //   .required('Required.')
    //   .matches(regex.name, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(t("validationMessages.required"))
      .email(t("validationMessages.validEmail")),
    mobileNumber: Yup.number()
      .typeError(t("validationMessages.onlyNumbers"))
      .integer(t("validationMessages.onlyNumbers"))
      // .required('Required.')
      .min(100000000, t("validationMessages.validMobile"))
      .max(999999999999999, t("validationMessages.validMobile")),
    password: Yup.string()
      .required(t("validationMessages.required"))
      .min(6, t("validationMessages.atLeast6Chars"))
      .max(12, t("validationMessages.max12Chars")),
    confirmPassword: Yup.string()
      .required(t("validationMessages.required"))
      .oneOf([Yup.ref("password")], t("validationMessages.bothPasswordSame")),
  });
