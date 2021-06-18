import React, { useRef } from "react";
import {
  Input,
  PagerDotBar,
  // Button,
  PhotoBanner,
} from "../../components/index";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { Content } from "native-base";
import { useTranslation } from "react-i18next";
// import {
//   convertProfileDataToFormData,
//   showToast,
//   useStateCallback,
//   openImagePicker,
// } from "../../utility";
import { fonts, spacing, colors } from "../../styles/index";
// import myProfileSecondForm from "../../schema/myProfileSecondForm";

const MyProfileSecondForm = ({
  profile = {},
  setActivePage,
  activePage,
  // firstPageData,
  // updateProfileData,
  // setProfileImage,
  profileImage,
}) => {
  // const [isButtonLoading, setButtonLoading] = useStateCallback(false);
  const {
    address,
    pincode,
    bankAccountName,
    bankAccountNo,
    ifscCode,
    firstName,
    profilePhoto,
  } = profile || {};

  const { t } = useTranslation();
  let pincodeRef = useRef();

  // const handleSubmit = (data) => {
  //   !isButtonLoading &&
  //     setButtonLoading(true, () => {
  //       let formData = convertProfileDataToFormData({
  //         ...firstPageData,
  //         profileImageObj: profileImage,
  //         ...data,
  //       });
  //       updateProfileData(formData)
  //         .then((res) => {
  //           res.data.success === true
  //             ? showToast(res.data.successMessage)
  //             : showToast(res.data.errorMessage);
  //           setButtonLoading(false);
  //         })
  //         .catch(() => {
  //           setButtonLoading(false);
  //         });
  //     });
  // };

  // const onProfileImageClick = () => {
  //   openImagePicker((selectedFile) => {
  //     selectedFile &&
  //       selectedFile.name &&
  //       selectedFile.uri &&
  //       setProfileImage(selectedFile);
  //   });
  // };

  return (
    <>
      <PhotoBanner
        hasImage={profileImage?.uri || profilePhoto}
        imageURL={profileImage?.uri || profilePhoto}
        name={firstName}
        // onClick={onProfileImageClick}
      />
      <Content keyboardShouldPersistTaps="handled" style={styles.content}>
        <Formik
          initialValues={{
            address: address || "",
            pincode: pincode || "",
            bankName: bankAccountName || "",
            ifscCode: ifscCode || "",
            accountNo: String(bankAccountNo || ""),
          }}
          // validationSchema={() => myProfileSecondForm(t)}
          // onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            handleSubmit,
          }) => {
            return (
              <>
                <Input
                  inputStyle={styles.textarea}
                  viewStyle={[styles.inputParent, { marginTop: 10 }]}
                  isPassword={false}
                  onChange={(value) => setFieldValue("address", value)}
                  error={errors.address}
                  showError={touched.address && errors.address}
                  value={values.address}
                  onBlur={() =>
                    !touched.address && setFieldTouched("address", true, true)
                  }
                  // inputRef={(inputRef) => {
                  //   addressRef = inputRef;
                  // }}
                  onSubmitEditing={() => {
                    pincodeRef?._root?.focus?.();
                  }}
                  multiline={true}
                  placeholder={t("myProfile.addressPlaceholder")}
                  withOutItem={false}
                  maxLength={500}
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
                <Input
                  placeholder={t("myProfile.pincodePlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("pincode", value)}
                  error={errors.pincode}
                  showError={touched.pincode && errors.pincode}
                  value={values.pincode}
                  onBlur={() =>
                    !touched.pincode && setFieldTouched("pincode", true, true)
                  }
                  inputRef={(inputRef) => {
                    pincodeRef = inputRef;
                  }}
                  onSubmitEditing={handleSubmit}
                  isSubmit={true}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  keyboardType="number-pad"
                  disabled={true}
                />
                <Input
                  placeholder={t("myProfile.bankNamePlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("bankName", value)}
                  error={errors.bankName}
                  showError={touched.bankName && errors.bankName}
                  value={values.bankName}
                  onBlur={() =>
                    !touched.bankName && setFieldTouched("bankName", true, true)
                  }
                  // onSubmitEditing={() => {
                  //   ifscCodeRef?._root?.focus?.();
                  // }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
                <Input
                  placeholder={t("myProfile.ifscCodePlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("ifscCode", value)}
                  error={errors.ifscCode}
                  showError={touched.ifscCode && errors.ifscCode}
                  value={values.ifscCode}
                  onBlur={() =>
                    !touched.ifscCode && setFieldTouched("ifscCode", true, true)
                  }
                  // inputRef={(inputRef) => {
                  //   ifscCodeRef = inputRef;
                  // }}
                  // onSubmitEditing={() => {
                  //   accountNoRef?._root?.focus?.();
                  // }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
                <Input
                  placeholder={t("myProfile.accountNoPlaceholder")}
                  isPassword={false}
                  onChange={(value) => setFieldValue("accountNo", value)}
                  error={errors.accountNo}
                  showError={touched.accountNo && errors.accountNo}
                  value={values.accountNo}
                  onBlur={() =>
                    !touched.accountNo &&
                    setFieldTouched("accountNo", true, true)
                  }
                  // inputRef={(inputRef) => {
                  //   accountNoRef = inputRef;
                  // }}
                  // onSubmitEditing={() => {
                  //   vehicleRegNoRef?._root?.focus?.();
                  // }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={styles.inputParent}
                  keyboardType="number-pad"
                  disabled={true}
                  selection={{ start: 0, end: 0 }}
                />
              </>
            );
          }}
        </Formik>
        {/* <Button
          text={t("myProfile.buttons.submit")}
          onClick={handleSubmit}
          disabled={isButtonLoading}
          isLoading={isButtonLoading}
          style={styles.button}
          textStyle={styles.buttonText}
        /> */}
        <PagerDotBar
          parentViewStyle={styles.pageDotBar}
          onChange={setActivePage}
          activeIndex={activePage}
          length={2}
        />
      </Content>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingRight: spacing.md,
    paddingLeft: spacing.md,
    paddingTop: spacing.md,
  },
  input: {
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // height: 50,
    marginTop: -10,
  },
  inputParent: { marginBottom: 10 },
  pageDotBar: {
    marginBottom: 80,
  },
  labelText: {
    fontSize: fonts.sizeXL,
    color: colors.textGray,
    marginTop: spacing.md,
    // marginBottom: spacing.sm,
  },
  text: {
    fontSize: fonts.sizeXL,
    color: colors.textGray,
    marginTop: 10,
  },
  textarea: {
    maxHeight: 100,
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // paddingTop: 4,
    // paddingBottom: 0,
    marginTop: 8,
  },
  button: {
    width: "100%",
  },
  checkbox: { marginTop: 10, marginBottom: 20 },
});

export default MyProfileSecondForm;
