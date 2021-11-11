import React, { useState, useEffect } from "react";
import { Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { WithLogoLayout, Input, Button } from "../components/index";
import { colors, fonts, spacing } from "../styles/index";
import { constants } from "../constants/index";
import otpSchema from "../schema/otp";
import { verifyOTP, sendOTP } from "../api/otp";
import { showToast } from "../utility";

const OTP = ({ navigation, route }) => {
  const [isLoading, setLoader] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds !== 0) {
          setSeconds((seconds) => seconds - 1);
        } else {
          setIsActive(false);
          setSeconds(30);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const { mobileNo } = route.params || {};
  const { icons } = constants;

  const goBack = () => navigation.goBack();

  const resendOTP = () => {
    const body = {
      contactNo: `+91${mobileNo}`,
    };
    !isLoading &&
      sendOTP(body)
        .then((res) => {
          if (res.data.success === true) {
            showToast(res.data.successMessage);
            setIsActive(true);
          } else {
            setIsActive(true);
            showToast(res.data.errorMessage);
          }
        })
        .catch(() => {
          setIsActive(true);
        });
  };

  const handleSubmit = (data) => {
    const body = {
      contactNo: mobileNo,
      otp: data.otp,
    };
    verifyOTP(body)
      .then((res) => {
        if (res.data.success === true) {
          setLoader(false);
          showToast(res.data.successMessage);
          navigation.navigate("resetPassword", {
            mobileNo,
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
      title={t("otp.headerTitle")}
      style={styles.parent}>
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={() => otpSchema(t)}
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
                <Text style={styles.labelText}>{t("otp.label")}</Text>
              </View>
              <Text style={styles.otpText}>{t("otp.otpText") + mobileNo}</Text>
              <Input
                placeholder={t("otp.otpPlaceholder")}
                onChange={(value) => setFieldValue("otp", value)}
                error={errors.otp}
                showError={touched.otp && errors.otp}
                value={values.otp}
                onBlur={() =>
                  !touched.otp && setFieldTouched("otp", true, true)
                }
                onSubmitEditing={() => {
                  handleSubmit();
                }}
                isSubmit
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
                keyboardType="number-pad"
              />
              <Button
                text={t("otp.button.verify")}
                disabled={isLoading}
                isLoading={isLoading}
                style={styles.button}
                textStyle={styles.buttonText}
                onClick={handleSubmit}
              />
              <Text style={styles.notReceived}>
                {t("otp.notReceived")}
                <Text
                  onPress={!isActive ? resendOTP : null}
                  style={[
                    styles.resendText,
                    { color: isActive ? colors.textGray : colors.textPrimary },
                  ]}>
                  {isActive
                    ? `${t("otp.resend")} in ${seconds}`
                    : t("otp.resend")}
                </Text>
              </Text>
              <Text style={styles.changeMobileNo} onPress={goBack}>
                {t("otp.changeMobileNo")}
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
  changeMobileNo: {
    alignSelf: "center",
    color: colors.textPrimary,
    fontSize: fonts.fontSizeLarge,
    fontWeight: fonts.fontWeightMedium,
    lineHeight: 20,
    paddingTop: 15,
  },
  notReceived: {
    alignSelf: "center",
    color: colors.textGray,
    fontSize: fonts.fontSizeLarge,
    fontWeight: fonts.fontWeightMedium,
    lineHeight: 20,
    paddingTop: 15,
  },
  resendText: {
    alignSelf: "center",
    color: colors.textPrimary,
    fontSize: fonts.fontSizeLarge,
    fontWeight: fonts.fontWeightMedium,
  },
  otpText: {
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
});
export default OTP;
