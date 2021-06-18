import * as Yup from "yup";
import { constants } from "../constants";

const { regex } = constants;
export default (t) =>
  Yup.object({
    ifscCode: Yup.string().matches(
      regex.ifscCode,
      t("validationMessages.validIFSC")
    ),
    accountNo: Yup.string().matches(
      regex.bankAccountNo,
      t("validationMessages.validAccount")
    ),
    // branchPincode: Yup.string().matches(
    //   regex.pincode,
    //   t("validationMessages.validPincode")
    // ),
    vehicleRegNo: Yup.string().matches(
      regex.vehicleRegistrationNo,
      t("validationMessages.validVehicleRegNo")
    ),
  });
