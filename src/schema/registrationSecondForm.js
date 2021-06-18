import * as Yup from "yup";
import { constants } from "../constants";

const { regex } = constants;
export default (t) =>
  Yup.object({
    documentType: Yup.string().required(t("validationMessages.required")),
    documentNo: Yup.string()
      .required(t("validationMessages.required"))
      .when("documentType", {
        is: (val) => val === "aadhar",
        then: Yup.string().matches(
          regex.aadhar,
          t("validationMessages.validAadhar")
        ),
      })
      .when("documentType", {
        is: (val) => val === "driving_license",
        then: Yup.string().matches(
          regex.drivingLicense,
          t("validationMessages.validDrivingLicense")
        ),
      })
      .when("documentType", {
        is: (val) => val === "pan",
        then: Yup.string().matches(regex.pan, t("validationMessages.validPAN")),
      }),
    documentFileName: Yup.string().required(t("validationMessages.required")),
    pincode: Yup.string()
      // .required(t("validationMessages.required"))
      .matches(regex.pincode, t("validationMessages.validPincode")),
    hubID: Yup.string().required(t("validationMessages.required")),
  });
