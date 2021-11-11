import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { WithContainer, Input, Button } from "../components/index";
import { colors, fonts, spacing } from "../styles/index";
import loginSchema from "../schema/login";
import { removeToken, showToast, useStateCallback } from "../utility";
import { setUserData } from "../actions/login";

const Login = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      removeToken();
    });
    return unsubscribe;
  }, [route]);
  const [isLoading, setLoader] = useStateCallback(false);
  const dispatch = useDispatch();

  const login = (body) => {
    !isLoading &&
      setLoader(true, () => {
        dispatch(setUserData(body))
          .then((res) => {
            setLoader(false);
            res.success === true
              ? showToast(res.successMessage)
              : showToast(res.errorMessage);
          })
          .catch(() => {
            setLoader(false);
          });
      });
  };

  const handleSubmit = (data) => {
    const body = {
      contactNo: Number(data.mobile),
      password: data.password,
    };
    login(body);
  };

  const onForgotPassword = () => navigation.navigate("forgotPassword");
  const onRegistration = () => navigation.navigate("registration");

  const { t } = useTranslation();

  let passwordRef = useRef();

  return (
    <WithContainer
      contentStyle={styles.content}
      isHeader
      title={t("login.headerTitle")}
      isRefreshControl={false}>
      <Formik
        initialValues={{
          mobile: "",
          password: "",
        }}
        validationSchema={() => loginSchema(t)}
        onSubmit={handleSubmit}>
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
              <Input
                placeholder={t("login.mobilePlaceholder")}
                onChange={(value) => setFieldValue("mobile", value)}
                error={errors.mobile}
                showError={touched.mobile && errors.mobile}
                value={values.mobile}
                onBlur={() =>
                  !touched.mobile && setFieldTouched("mobile", true, true)
                }
                onSubmitEditing={() => {
                  passwordRef._root.focus();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
                keyboardType="number-pad"
              />
              <Input
                placeholder={t("login.passwordPlaceholder")}
                isPassword
                onChange={(value) => setFieldValue("password", value)}
                error={errors.password}
                showError={touched.password && errors.password}
                value={values.password}
                onBlur={() =>
                  !touched.password && setFieldTouched("password", true, true)
                }
                inputRef={(input) => {
                  passwordRef = input;
                }}
                onSubmitEditing={handleSubmit}
                isSubmit
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Button
                text={t("login.buttons.login")}
                onClick={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              <View style={styles.textParent}>
                <Text style={styles.text} onPress={onForgotPassword}>
                  {t("login.forgotPasswordLabel")}
                </Text>
                {/* <Text style={[styles.text]}>|</Text> */}
                <Text style={styles.text} onPress={onRegistration}>
                  {t("login.registrationLabel")}
                </Text>
              </View>
            </>
          );
        }}
      </Formik>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 40,
    height: "100%",
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: spacing.sm,
  },
  buttonText: {
    fontSize: fonts.sizeXL,
  },
  text: {
    color: colors.textPrimary,
    fontSize: fonts.sizeLG,
    fontWeight: fonts.weightNormal,
  },
  textParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  lastElement: {
    marginBottom: 70,
  },
  orText: {
    marginTop: 30,
    marginBottom: 20,
    color: colors.textGray,
    textAlign: "center",
    fontSize: fonts.sizeXXL,
    fontWeight: fonts.weightBold,
    marginLeft: -10,
  },
  input: {
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // height: 50,
    marginTop: -10,
  },
  inputParent: { marginBottom: 10 },
});
export default Login;
