import React, { useState } from "react";
import { Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { WithLogoLayout, Input, Button } from "../components/index";
import { colors, fonts, spacing } from "../styles/index";
import { constants } from "../constants/index";
import forgotPasswordSchema from "../schema/forgotPassword";
import { sendOTP } from "../api/otp";
import { showToast } from "../utility";

const ForgotPassword = ({ navigation }) => {
  const [isLoading, setLoader] = useState(false);

  const { t } = useTranslation();
  const { icons } = constants;

  const goBack = () => navigation.goBack();

  const handleSubmit = (data) => {
    const body = {
      contactNo: `+91${data.mobileNo}`,
    };
    !isLoading &&
      sendOTP(body)
        .then((res) => {
          if (res.data.success === true) {
            setLoader(false);
            showToast(res.data.successMessage);
            navigation.navigate("otp", {
              mobileNo: data.mobileNo,
            });
          } else {
            setLoader(false);
            showToast(res.data.errorMessage);
          }
        })
        .catch(() => {
          setLoader(false);
        });
    setLoader(true);
  };

  return (
    <WithLogoLayout
      isHeader
      leftIcon={icons.arrowBack.name}
      onLeftIconClick={goBack}
      title={t("forgotPassword.headerTitle")}
      style={styles.parent}>
      <Formik
        initialValues={{ mobileNo: "" }}
        validationSchema={() => forgotPasswordSchema(t)}
        onSubmit={handleSubmit}>
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
              <View style={styles.label}>
                <Text style={styles.labelText}>
                  {t("forgotPassword.label")}
                </Text>
              </View>
              <Text style={styles.forgotPwText}>
                {t("forgotPassword.forgotPasswordText")}
              </Text>
              <Input
                placeholder={t("forgotPassword.mobileNoPlaceholder")}
                onChange={(value) => setFieldValue("mobileNo", value)}
                error={errors.mobileNo}
                showError={touched.mobileNo && errors.mobileNo}
                value={values.mobileNo}
                onBlur={() =>
                  !touched.mobileNo && setFieldTouched("mobileNo", true, true)
                }
                onSubmitEditing={handleSubmit}
                isSubmit
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
                keyboardType="number-pad"
              />
              <Button
                text={t("forgotPassword.buttons.submit")}
                disabled={isLoading}
                isLoading={isLoading}
                style={styles.button}
                textStyle={styles.buttonText}
                onClick={handleSubmit}
              />
              <Text style={styles.knowPassword}>
                {t("forgotPassword.knowPassword")}
                <Text onPress={goBack} style={styles.login}>
                  {t("forgotPassword.login")}
                </Text>
              </Text>
            </>
          );
        }}
      </Formik>
    </WithLogoLayout>
  );
};

const styles = StyleSheet.create({
  parent: {
    padding: 20,
    paddingTop: 40,
  },
  button: {
    width: "100%",
    marginTop: spacing.sm,
  },
  buttonText: {
    fontSize: fonts.sizeXL,
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    color: colors.textPrimary,
    fontSize: 22,
    marginBottom: 30,
  },
  forgotPwText: {
    marginTop: -20,
    fontSize: fonts.fontSizeMedium,
    fontWeight: fonts.fontWeightMedium,
    color: colors.textGray,
    marginBottom: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // height: 50,
    marginTop: -10,
  },
  inputParent: { marginBottom: 10 },
  knowPassword: {
    alignSelf: "center",
    color: colors.textGray,
    fontSize: fonts.fontSizeLarge,
    fontWeight: fonts.fontWeightMedium,
    lineHeight: 20,
    paddingTop: 15,
  },
  login: {
    color: colors.textPrimary,
  },
});
export default ForgotPassword;
