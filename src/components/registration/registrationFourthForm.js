import React, { useRef } from "react";
import {
  WithContainer,
  Input,
  Button,
  PagerDotBar,
} from "../../components/index";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { register } from "../../api/registration";
import { fonts, spacing, colors } from "../../styles/index";
import registrationFourthFormSchema from "../../schema/registrationFourthForm";
import {
  useStateCallback,
  convertRegistrationDataToFormData,
  showToast,
} from "../../utility";

const RegistrationFourthForm = ({
  activePage,
  setRegistrationData,
  registrationData,
  navigation,
}) => {
  const [isLoading, setLoader] = useStateCallback(false);
  const { t } = useTranslation();

  const handleSubmit = (data) => {
    setRegistrationData({ ...registrationData, ...data });
    setLoader(true, () => {
      let body = convertRegistrationDataToFormData({
        ...registrationData,
        ...data,
      });
      register(body)
        .then((res) => {
          setLoader(false);
          if (res.data.success === true) {
            showToast(res.data.successMessage);
            navigation.goBack();
          } else {
            showToast(res.data.errorMessage);
          }
        })
        .catch(() => {
          setLoader(false);
        });
    });
  };

  let retroKitNoRef,
    chassisNoRef,
    dcMakerNameRef,
    dcMakerNumberRef,
    driveMakerNameRef,
    driveMakerModelRef = useRef();

  return (
    <WithContainer
      isLoading={false}
      isHeader={false}
      isRefreshControl={false}
      contentStyle={styles.content}
    >
      <Formik
        initialValues={{
          retroKitName: "",
          retroKitNumber: "",
          chassisNumber: "",
          dcMakerName: "",
          dcMakerNumber: "",
          driveMakerName: "",
          driveMakerModel: "",
        }}
        validationSchema={() => registrationFourthFormSchema(t)}
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
                placeholder={t("registration.retrofitKitNamePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("retroKitName", value)}
                error={errors.retroKitName}
                showError={touched.retroKitName && errors.retroKitName}
                value={values.retroKitName}
                onBlur={() =>
                  !touched.retroKitName &&
                  setFieldTouched("retroKitName", true, true)
                }
                onSubmitEditing={() => {
                  retroKitNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
              />
              <Input
                placeholder={t("registration.retrofitKitNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("retroKitNumber", value)}
                error={errors.retroKitNumber}
                showError={touched.retroKitNumber && errors.retroKitNumber}
                value={values.retroKitNumber}
                onBlur={() =>
                  !touched.retroKitNumber &&
                  setFieldTouched("retroKitNumber", true, true)
                }
                inputRef={(inputRef) => {
                  retroKitNoRef = inputRef;
                }}
                onSubmitEditing={() => {
                  chassisNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.chassisNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("chassisNumber", value)}
                error={errors.chassisNumber}
                showError={touched.chassisNumber && errors.chassisNumber}
                value={values.chassisNumber}
                onBlur={() =>
                  !touched.chassisNumber &&
                  setFieldTouched("chassisNumber", true, true)
                }
                inputRef={(inputRef) => {
                  chassisNoRef = inputRef;
                }}
                onSubmitEditing={() => {
                  dcMakerNameRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.dcMakerNamePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("dcMakerName", value)}
                error={errors.dcMakerName}
                showError={touched.dcMakerName && errors.dcMakerName}
                value={values.dcMakerName}
                onBlur={() =>
                  !touched.dcMakerName &&
                  setFieldTouched("dcMakerName", true, true)
                }
                inputRef={(inputRef) => {
                  dcMakerNameRef = inputRef;
                }}
                onSubmitEditing={() => {
                  dcMakerNumberRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.dcMakerNumberPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("dcMakerNumber", value)}
                error={errors.dcMakerNumber}
                showError={touched.dcMakerNumber && errors.dcMakerNumber}
                value={values.dcMakerNumber}
                onBlur={() =>
                  !touched.dcMakerNumber &&
                  setFieldTouched("dcMakerNumber", true, true)
                }
                inputRef={(inputRef) => {
                  dcMakerNumberRef = inputRef;
                }}
                onSubmitEditing={() => {
                  driveMakerNameRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.driverMakerNamePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("driveMakerName", value)}
                error={errors.driveMakerName}
                showError={touched.driveMakerName && errors.driveMakerName}
                value={values.driveMakerName}
                onBlur={() =>
                  !touched.driveMakerName &&
                  setFieldTouched("driveMakerName", true, true)
                }
                inputRef={(inputRef) => {
                  driveMakerNameRef = inputRef;
                }}
                onSubmitEditing={() => {
                  driveMakerModelRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.driveMakerModelPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("driveMakerModel", value)}
                error={errors.driveMakerModel}
                showError={touched.driveMakerModel && errors.driveMakerModel}
                value={values.driveMakerModel}
                onBlur={() =>
                  !touched.driveMakerModel &&
                  setFieldTouched("driveMakerModel", true, true)
                }
                inputRef={(inputRef) => {
                  driveMakerModelRef = inputRef;
                }}
                onSubmitEditing={handleSubmit}
                isSubmit={true}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Button
                text={t("registration.buttons.register")}
                onClick={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
                style={styles.button}
                textStyle={styles.buttonText}
              />
              {/* <Text style={styles.text} onPress={goBack}>
                {t("registration.alReadyAccountText")}
              </Text> */}
              <PagerDotBar
                parentViewStyle={styles.pageDotBar}
                onChange={handleSubmit}
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
  buttonText: {
    fontSize: fonts.sizeXL,
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
});

export default RegistrationFourthForm;
