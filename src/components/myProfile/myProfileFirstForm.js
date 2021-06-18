import React, { useRef } from "react";
import {
  Input,
  DateTimePicker,
  PagerDotBar,
  // Button,
  // RadioButton,
  PhotoBanner,
} from "../../components/index";
import { Formik } from "formik";
import { StyleSheet, View, Text } from "react-native";
import { Content, Icon } from "native-base";
import { useTranslation } from "react-i18next";
import { fonts, spacing, colors } from "../../styles/index";
import { constants } from "../../constants";
// import myProfileFirstForm from "../../schema/myProfileFirstForm";
import { openImagePicker } from "../../utility/index";

const MyProfileFirstForm = ({
  profile = {},
  setActivePage,
  activePage,
  // setFirstPageData,
  setProfileImage,
  profileImage,
}) => {
  const {
    firstName,
    lastName,
    dob,
    profilePhoto,
    aadharCardNo,
    drivingLicenseNo,
    panNo,
    contactNo,
    altContactNo,
  } = profile || {};

  const { t } = useTranslation();
  const { icons } = constants;

  let lastNameRef,
    secondaryMobileNoRef = useRef();

  // const handleSubmit = (data) => {
  //   setFirstPageData(data);
  //   setActivePage(1);
  // };

  let maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 18);

  const onProfileImageClick = () => {
    openImagePicker((selectedFile) => {
      selectedFile &&
        selectedFile.name &&
        selectedFile.uri &&
        setProfileImage(selectedFile);
    });
  };

  return (
    <>
      <PhotoBanner
        hasImage={profileImage?.uri || profilePhoto}
        imageURL={profileImage?.uri || profilePhoto}
        name={firstName}
        onClick={onProfileImageClick}
      />
      <Content keyboardShouldPersistTaps="handled" style={styles.content}>
        <Formik
          initialValues={{
            firstName: firstName || "",
            lastName: lastName || "",
            dob: dob ? new Date(dob) : "",
            mobileNumber: String(contactNo || ""),
            secondaryMobileNo: String(altContactNo || ""),
            profileImage: profilePhoto || "",
            profileImageObj: {
              uri: "",
              name: profilePhoto || "",
            },
            documentType: aadharCardNo
              ? "aadhar"
              : drivingLicenseNo
              ? "driving_license"
              : "pan",
            documentNo: String(aadharCardNo || drivingLicenseNo || panNo || ""),
            documentFileName: "",
            documentObj: {
              uri: "",
              name: "",
            },
          }}
          // validationSchema={() => myProfileFirstForm(t)}
          // onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            // handleSubmit,
          }) => {
            // i18n.on("languageChanged", () => {
            //   Object.keys(errors).forEach((fieldName) => {
            //     setFieldTouched(fieldName);
            //   });
            // });
            return (
              <>
                <Input
                  placeholder={t("myProfile.firstNamePlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("firstName", value)}
                  error={errors.firstName}
                  showError={touched.firstName && errors.firstName}
                  value={values.firstName}
                  onBlur={() =>
                    !touched.firstName &&
                    setFieldTouched("firstName", true, true)
                  }
                  onSubmitEditing={() => {
                    lastNameRef?._root?.focus?.();
                  }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={[styles.inputParent, { marginTop: 10 }]}
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
                <Input
                  placeholder={t("myProfile.lastNamePlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("lastName", value)}
                  error={errors.lastName}
                  showError={touched.lastName && errors.lastName}
                  value={values.lastName}
                  onBlur={() =>
                    !touched.lastName && setFieldTouched("lastName", true, true)
                  }
                  inputRef={(inputRef) => {
                    lastNameRef = inputRef;
                  }}
                  onSubmitEditing={() => {
                    secondaryMobileNoRef?._root?.focus?.();
                  }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
                <DateTimePicker
                  // disabled={true}
                  maximumDate={maximumDate}
                  value={values.dob}
                  onChange={(value) => setFieldValue("dob", value)}
                  mode="date"
                  error={errors.dob}
                  showError={touched.dob && errors.dob}
                  onBlur={() =>
                    !touched.dob && setFieldTouched("dob", true, true)
                  }
                  placeholder={t("myProfile.dobPlaceholder")}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  // rippleStyle={{ marginTop: -10 }}
                  disabled={true}
                  iconStyle={{ marginTop: 16 }}
                />
                <Input
                  placeholder={t("myProfile.mobileNoPlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("mobileNumber", value)}
                  error={errors.mobileNumber}
                  showError={touched.mobileNumber && errors.mobileNumber}
                  value={values.mobileNumber}
                  onBlur={() =>
                    !touched.mobileNumber &&
                    setFieldTouched("mobileNumber", true, true)
                  }
                  // inputRef={(inputRef) => {
                  //   mobileNoRef = inputRef;
                  // }}
                  // onSubmitEditing={() => {
                  //   secondaryMobileNoRef?._root?.focus?.();
                  // }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  keyboardType="number-pad"
                  disabled={true}
                />
                <Input
                  placeholder={t("myProfile.secondaryMobileNoPlaceholder")}
                  isPassword={false}
                  onChange={(value) =>
                    setFieldValue("secondaryMobileNo", value)
                  }
                  error={errors.secondaryMobileNo}
                  showError={
                    touched.secondaryMobileNo && errors.secondaryMobileNo
                  }
                  value={values.secondaryMobileNo}
                  onBlur={() =>
                    !touched.secondaryMobileNo &&
                    setFieldTouched("secondaryMobileNo", true, true)
                  }
                  inputRef={(inputRef) => {
                    secondaryMobileNoRef = inputRef;
                  }}
                  // onSubmitEditing={handleSubmit}
                  withOutItem={false}
                  isSubmit={true}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  keyboardType="number-pad"
                  disabled={true}
                />
                <View style={styles.verifiedTextParent}>
                  <Icon
                    name={icons.check.name}
                    type={icons.check.type}
                    style={styles.checkIcon}
                  />
                  <Text style={styles.verifiedText}>
                    {t("myProfile.accountVerifiedPlaceholder") +
                      (values.documentType === "aadhar"
                        ? t("myProfile.aadharCardPlaceholder")
                        : values.documentType === "driving_license"
                        ? t("myProfile.drivingLicensePlaceholder")
                        : t("myProfile.panCardPlaceholder"))}
                  </Text>
                </View>
                {/* <View style={styles.radioGroup}>
                  <RadioButton
                    text={t("myProfile.aadharRadioPlaceholder")}
                    selected={values.documentType === "aadhar"}
                    // onClick={(value) => {
                    //   if (value) {
                    //     setValues({
                    //       ...values,
                    //       documentType: "aadhar",
                    //       documentNo: "",
                    //       documentFileName: "",
                    //       documentObj: {
                    //         uri: "",
                    //         name: "",
                    //       },
                    //     });
                    //   }
                    // }}
                    textStyle={styles.radioText}
                    disabled={true}
                  />
                  <RadioButton
                    text={t("myProfile.licenseRadioPlaceholder")}
                    selected={values.documentType === "driving_license"}
                    // onClick={(value) => {
                    //   if (value) {
                    //     setValues({
                    //       ...values,
                    //       documentType: "driving_license",
                    //       documentNo: "",
                    //       documentFileName: "",
                    //       documentObj: {
                    //         uri: "",
                    //         name: "",
                    //       },
                    //     });
                    //   }
                    // }}
                    textStyle={styles.radioText}
                    disabled={true}
                  />
                  <RadioButton
                    text={t("myProfile.panRadioPlaceholder")}
                    selected={values.documentType === "pan"}
                    // onClick={(value) => {
                    //   if (value) {
                    //     setValues({
                    //       ...values,
                    //       documentType: "pan",
                    //       documentNo: "",
                    //       documentFileName: "",
                    //       documentObj: {
                    //         uri: "",
                    //         name: "",
                    //       },
                    //     });
                    //   }
                    // }}
                    textStyle={styles.radioText}
                    disabled={true}
                  />
                </View>
                <Input
                  placeholder={
                    values.documentType === "aadhar"
                      ? t("myProfile.aadharNoPlaceholder")
                      : values.documentType === "driving_license"
                      ? t("myProfile.licenseNoPlaceholder")
                      : t("myProfile.panNoPlaceholder")
                  }
                  isPassword={false}
                  onChange={(value) => setFieldValue("documentNo", value)}
                  error={errors.documentNo}
                  showError={touched.documentNo && errors.documentNo}
                  value={values.documentNo}
                  onBlur={() =>
                    !touched.documentNo &&
                    setFieldTouched("documentNo", true, true)
                  }
                  // onSubmitEditing={() => {
                  //   addressRef?._root?.focus?.();
                  // }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
                <View style={styles.rowView}>
                  <Input
                    viewStyle={styles.buttonFirstColumn}
                    placeholder={
                      values.documentType === "aadhar"
                        ? t("myProfile.aadharPhotoPlaceholder")
                        : values.documentType === "driving_license"
                        ? t("myProfile.licensePhotoPlaceholder")
                        : t("myProfile.panPhotoPlaceholder")
                    }
                    isPassword={false}
                    disabled={true}
                    error={errors.documentFileName}
                    showError={
                      touched.documentFileName && errors.documentFileName
                    }
                    value={values.documentFileName}
                    withOutItem={false}
                    inputStyle={styles.input}
                    // viewStyle={styles.inputParent}
                    selection={{ start: 0, end: 0 }}
                  />
                  <Button
                    text={t("myProfile.buttons.upload")}
                    // onClick={() => {
                    //   openImageAndDocumentPicker((selectedFile) => {
                    //     selectedFile &&
                    //       selectedFile.name &&
                    //       setFieldValue("documentFileName", selectedFile.name);
                    //     selectedFile.uri &&
                    //       setFieldValue("documentObj", selectedFile);
                    //     setTimeout(
                    //       () =>
                    //         !touched.fitnessExpiryPhoto &&
                    //         setFieldTouched("documentFileName", true, true),
                    //       1000
                    //     );
                    //   });
                    // }}
                    style={styles.buttonSecondColumn}
                    textStyle={styles.buttonText}
                    disabled={true}
                  />
                </View> */}
                {/* <Button
                  text={t("myProfile.buttons.next")}
                  onClick={handleSubmit}
                  // onClick={() => setActivePage(1)}
                  style={styles.button}
                  textStyle={styles.buttonText}
                /> */}
                {/* <Text style={styles.text} onPress={goBack}>
                {t("myProfile.alReadyAccountText")}
              </Text> */}
                <PagerDotBar
                  parentViewStyle={styles.pageDotBar}
                  onChange={setActivePage}
                  activeIndex={activePage}
                  length={2}
                  paginationStyle={styles.paginationStyle}
                />
              </>
            );
          }}
        </Formik>
      </Content>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingRight: spacing.md,
    paddingLeft: spacing.md,
  },
  input: {
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // height: 50,
    marginTop: -10,
  },
  inputParent: { marginBottom: 10 },
  pageDotBar: {
    marginBottom: 60,
  },
  iconParent: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: colors.backGroundWhite,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  cameraIcon: {
    fontSize: 30,
    color: colors.iconBlack,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: "center",
  },
  rippleStyle: {
    borderBottomWidth: 1,
    borderColor: colors.borderGray,
    flexDirection: "row",
    paddingBottom: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonFirstColumn: {
    width: "100%",
    paddingRight: 78,
    marginRight: spacing.sm,
  },
  buttonSecondColumn: {
    width: 78,
    marginLeft: -68,
    height: spacing.lg,
    borderRadius: spacing.xxl,
    marginTop: 0,
    backgroundColor: colors.backgroundMediumGray,
  },
  rowView: {
    flexDirection: "row",
    paddingRight: spacing.md,
  },
  radioText: {
    fontSize: fonts.sizeLG,
  },
  checkIcon: {
    color: colors.iconGreen,
    fontSize: 22,
    marginRight: 5,
  },
  verifiedText: {
    fontSize: fonts.sizeXL,
    color: colors.textGreen,
    fontWeight: "bold",
    flexWrap: "wrap",
    paddingRight: 20,
  },
  verifiedTextParent: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    marginTop: spacing.md,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: fonts.sizeXL,
  },
});

export default MyProfileFirstForm;
