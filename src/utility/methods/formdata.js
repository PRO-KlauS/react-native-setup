import { removeAllSpacesFromString } from "./string";

const convertRegistrationDataToFormData = (obj) => {
  const formData = new FormData();

  // First form data
  formData.append("FirstName", obj.firstName);
  formData.append("LastName", obj.lastName);
  formData.append("IsActive", 2);
  obj.dob && formData.append("DOB", new Date(obj.dob).toDateString());
  formData.append("ContactNo", obj.mobileNumber);
  obj.secondaryMobileNo &&
    formData.append("AltContactNo", obj.secondaryMobileNo);
  formData.append("Password", obj.password);
  obj.profileImageObj &&
    obj.profileImageObj.uri &&
    !(obj.profileImageObj.uri && !obj.profileImageObj.name) &&
    formData.append("ProfilePhoto", obj.profileImageObj);

  // Second form data
  formData.append(
    `${
      obj.documentType === "aadhar"
        ? "AadharCardNo"
        : obj.documentType === "driving_license"
        ? "DrivingLicenseNo"
        : "PanNo"
    }`,
    removeAllSpacesFromString(obj.documentNo),
  );
  obj.documentObj &&
    obj.documentObj.uri &&
    !(obj.documentObj.uri && !obj.documentObj.name) &&
    formData.append(
      // Change key names
      `documents.${
        obj.documentType === "aadhar"
          ? "AadharCopy"
          : obj.documentType === "driving_license"
          ? "DrivingLicenseCopy"
          : "PanCopy"
      }`,
      obj.documentObj,
    );

  formData.append("HubId", obj.hubID);
  obj.address && formData.append("Address", obj.address);
  obj.pincode && formData.append("Pincode", obj.pincode);

  // Third Form Data
  obj.bankName && formData.append("BankAccountName", obj.bankName);
  obj.ifscCode && formData.append("IFSCCode", obj.ifscCode);
  obj.accountNo && formData.append("BankAccountNo", obj.accountNo);
  // obj.branchAddress &&
  //   formData.append("driver[achieve_goal_by_platform]", obj.branchAddress);
  // obj.branchPincode &&
  //   formData.append("driver[personal_trainer]", obj.branchPincode);
  obj.vehicleRegNo &&
    formData.append(
      "electricVehicle[VehicleNo]",
      removeAllSpacesFromString(obj.vehicleRegNo),
    );
  obj.insurancePolicyNo &&
    formData.append(
      "electricVehicle[InsurancePolicyNo]",
      obj.insurancePolicyNo,
    );

  // Fourth Form Data
  obj.retroKitName &&
    formData.append("electricVehicle[RetrofitKitName]", obj.retroKitName);
  obj.retroKitNumber &&
    formData.append("electricVehicle[RetrofitKitNo]", obj.retroKitNumber);
  formData.append("electricVehicle[ChassisNumber]", obj.chassisNumber);
  obj.dcMakerName &&
    formData.append("electricVehicle[DCConvertorMakerName]", obj.dcMakerName);
  obj.dcMakerNumber &&
    formData.append(
      "electricVehicle[DCConvertorMakerNumber]",
      obj.dcMakerNumber,
    );
  obj.driveMakerName &&
    formData.append("electricVehicle[DriveMotorMake]", obj.driveMakerName);
  obj.driveMakerModel &&
    formData.append("electricVehicle[DriveMotorModel]", obj.driveMakerModel);
  return formData;
};

const convertProfileDataToFormData = (obj) => {
  const formData = new FormData();

  // First form data
  formData.append("driver[firstName]", obj.firstName);
  formData.append("driver[lastName]", obj.lastName);
  obj.dob && formData.append("driver[dob]", new Date(obj.dob).toDateString());
  obj.secondaryMobileNo &&
    formData.append("driver[altContactNo]", obj.secondaryMobileNo);
  obj.profileImageObj &&
    obj.profileImageObj.uri &&
    !(obj.profileImageObj.uri && !obj.profileImageObj.name) &&
    formData.append("driver[profilePhoto]", obj.profileImageObj);

  // Second form data
  obj.address && formData.append("driver[address]", obj.address);
  obj.pincode && formData.append("driver[pincode]", obj.pincode);

  // obj.bankName && formData.append("driver[bankAccountName]", obj.bankName);
  // obj.ifscCode && formData.append("driver[ifscCode]", obj.ifscCode);
  // obj.accountNo && formData.append("driver[bankAccountNo]", obj.accountNo);
};

export { convertProfileDataToFormData, convertRegistrationDataToFormData };
