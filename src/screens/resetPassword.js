import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { WithLogoLayout, Input, Button } from "../components/index";
import { colors, fonts } from "../styles/index";
import resetPasswordSchema from "../schema/resetPassword";
import { resetPassword } from "../api/resetPassword";
import { showToast } from "../utility";
import { constants } from "../constants";

const ResetPassword = ({ navigation, route }) => {
  const [isLoading, setLoader] = useState(false);

  let confirmPasswordRef = React.useRef();
  const { t } = useTranslation();
  const { icons } = constants;

  const goBack = () => navigation.goBack();

  const onReset = (data) => {
    const body = {
      contactNo: route?.params?.mobileNo,
      password: data.password,
    };
    resetPassword(body)
      .then((res) => {
        if (res.data.success === true) {
          setLoader(false);
          showToast(res.data.successMessage);
          navigation.navigate("login");
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
      style={styles.parent}
      isHeader
      leftIcon={icons.arrowBack.name}
      onLeftIconClick={goBack}
      title={t("resetPassword.headerTitle")}>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={() => resetPasswordSchema(t)}
        onSubmit={onReset}>
        {({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <>
              <View style={styles.label}>
                <Text style={styles.labelText}>{t("resetPassword.label")}</Text>
              </View>
              <Input
                placeholder={t("resetPassword.passwordPlaceholder")}
                isPassword
                onChange={(value) => setFieldValue("password", value)}
                error={errors.password}
                showError={touched.password && errors.password}
                value={values.password}
                onBlur={() =>
                  !touched.password && setFieldTouched("password", true, true)
                }
                onSubmitEditing={() => {
                  confirmPasswordRef._root.focus();
                }}
                isSubmit={false}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
              />
              <Input
                placeholder={t("resetPassword.confirmPassPlaceholder")}
                isPassword
                onChange={(value) => setFieldValue("confirmPassword", value)}
                error={errors.confirmPassword}
                showError={touched.confirmPassword && errors.confirmPassword}
                value={values.confirmPassword}
                onBlur={() =>
                  !touched.confirmPassword &&
                  setFieldTouched("confirmPassword", true, true)
                }
                inputRef={(input) => {
                  confirmPasswordRef = input;
                }}
                onSubmitEditing={handleSubmit}
                isSubmit
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Button
                text={t("resetPassword.buttons.reset")}
                onClick={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
                style={styles.button}
                textStyle={styles.buttonText}
              />
            </>
          );
        }}
      </Formik>
    </WithLogoLayout>
  );
};

const styles = StyleSheet.create({
  parent: { padding: 20, paddingTop: 40 },
  button: {
    width: "100%",
  },
  buttonText: {
    fontSize: fonts.fontSizeLarge,
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
  input: {
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // height: 50,
    marginTop: -10,
  },
  inputParent: { marginBottom: 10 },
});
export default ResetPassword;
