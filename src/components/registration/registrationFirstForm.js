import React, { useRef } from "react";
import {
  WithContainer,
  Input,
  Button,
  PagerDotBar,
  DateTimePicker,
} from "../../components/index";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { fonts, spacing, colors } from "../../styles/index";
import registrationFirstFormSchema from "../../schema/registrationFirstForm";
import { openImagePicker } from "../../utility";

const RegistrationFirstForm = ({
  activePage,
  setActivePage,
  setRegistrationData,
  registrationData,
}) => {
  const { t } = useTranslation();

  const handleSubmit = (data) => {
    setRegistrationData({ ...registrationData, ...data });
    setActivePage(1);
  };

  let maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 18);

  let lastNameRef,
    mobileNoRef,
    secondaryMobileNoRef,
    passwordRef,
    confirmPasswordRef = useRef();

  return (
    <WithContainer
      isLoading={false}
      isHeader={false}
      isRefreshControl={false}
      contentStyle={styles.content}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dob: "",
          mobileNumber: "",
          secondaryMobileNo: "",
          password: "",
          confirmPassword: "",
          profileImage: "",
          profileImageObj: {
            uri: "",
            name: "",
          },
        }}
        validationSchema={() => registrationFirstFormSchema(t)}
        onSubmit={handleSubmit}
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
                placeholder={t("registration.firstNamePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("firstName", value)}
                error={errors.firstName}
                showError={touched.firstName && errors.firstName}
                value={values.firstName}
                onBlur={() =>
                  !touched.firstName && setFieldTouched("firstName", true, true)
                }
                onSubmitEditing={() => {
                  lastNameRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
              />
              <Input
                placeholder={t("registration.lastNamePlaceholder")}
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
                  mobileNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
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
                placeholder={t("registration.dobPlaceholder")}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
                iconStyle={{ marginTop: 16 }}
                // rippleStyle={{ marginTop: -10 }}
              />
              <Input
                placeholder={t("registration.mobileNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("mobileNumber", value)}
                error={errors.mobileNumber}
                showError={touched.mobileNumber && errors.mobileNumber}
                value={values.mobileNumber}
                onBlur={() =>
                  !touched.mobileNumber &&
                  setFieldTouched("mobileNumber", true, true)
                }
                inputRef={(inputRef) => {
                  mobileNoRef = inputRef;
                }}
                onSubmitEditing={() => {
                  secondaryMobileNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
                keyboardType="number-pad"
              />
              <Input
                placeholder={t("registration.secondaryMobileNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("secondaryMobileNo", value)}
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
                onSubmitEditing={() => {
                  passwordRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
                keyboardType="number-pad"
              />
              <Input
                placeholder={t("registration.passwordPlaceholder")}
                isPassword={true}
                onChange={(value) => setFieldValue("password", value)}
                error={errors.password}
                showError={touched.password && errors.password}
                value={values.password}
                onBlur={() =>
                  !touched.password && setFieldTouched("password", true, true)
                }
                inputRef={(inputRef) => {
                  passwordRef = inputRef;
                }}
                onSubmitEditing={() => {
                  confirmPasswordRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.confirmPassPlaceholder")}
                isPassword={true}
                onChange={(value) => setFieldValue("confirmPassword", value)}
                error={errors.confirmPassword}
                showError={touched.confirmPassword && errors.confirmPassword}
                value={values.confirmPassword}
                onBlur={() =>
                  !touched.confirmPassword &&
                  setFieldTouched("confirmPassword", true, true)
                }
                inputRef={(inputRef) => {
                  confirmPasswordRef = inputRef;
                }}
                onSubmitEditing={() => {
                  handleSubmit();
                }}
                isSubmit={true}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <View style={styles.rowView}>
                <Input
                  viewStyle={styles.buttonFirstColumn}
                  placeholder={t("registration.profileImagePlaceholder")}
                  isPassword={false}
                  disabled={true}
                  error={errors.profileImage}
                  showError={touched.profileImage && errors.profileImage}
                  value={values.profileImage}
                  withOutItem={false}
                  inputStyle={styles.input}
                  selection={{ start: 0, end: 0 }}
                />
                <Button
                  text={t("registration.buttons.upload")}
                  onClick={() => {
                    openImagePicker((selectedFile) => {
                      selectedFile &&
                        selectedFile.name &&
                        setFieldValue("profileImage", selectedFile.name);
                      selectedFile.uri &&
                        setFieldValue("profileImageObj", selectedFile);
                      setTimeout(
                        () =>
                          !touched.fitnessExpiryPhoto &&
                          setFieldTouched("profileImage", true, true),
                        1000
                      );
                    });
                  }}
                  style={styles.buttonSecondColumn}
                  textStyle={styles.buttonText}
                />
              </View>
              <Button
                text={t("registration.buttons.next")}
                onClick={handleSubmit}
                // onClick={() => setActivePage(1)}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {/* <Text style={styles.text} onPress={goBack}>
                {t("registration.alReadyAccountText")}
              </Text> */}
              <PagerDotBar
                parentViewStyle={styles.pageDotBar}
                // onChange={handleSubmit}
                activeIndex={activePage}
                length={4}
                paginationStyle={styles.paginationStyle}
              />
            </>
          );
        }}
      </Formik>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 0,
    height: "100%",
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: spacing.md,
    marginBottom: 30,
  },
  text: {
    color: colors.textPrimary,
    fontSize: fonts.sizeLG,
    fontWeight: fonts.weightNormal,
    marginBottom: 60,
    textAlign: "center",
  },
  input: {
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // height: 50,
    marginTop: -10,
  },
  inputParent: { marginBottom: 10 },
  pageDotBar: {
    marginBottom: 100,
    // width:100
  },
  paginationStyle: {
    width: 100,
  },
  buttonFirstColumn: {
    width: "100%",
    paddingRight: 78,
    marginRight: spacing.sm,
    marginBottom: 10,
  },
  buttonSecondColumn: {
    width: 78,
    marginLeft: -68,
    height: spacing.lg,
    borderRadius: spacing.xxl,
    marginTop: 0,
    backgroundColor: colors.backgroundMediumGray,
  },
  buttonText: {
    fontSize: fonts.sizeXL,
  },
  rowView: {
    flexDirection: "row",
    paddingRight: spacing.md,
  },
});

export default RegistrationFirstForm;
