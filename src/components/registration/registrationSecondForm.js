import React, { useRef, useEffect } from "react";
import {
  WithContainer,
  Input,
  Button,
  PagerDotBar,
  RadioButton,
  MaskedInput,
  Dropdown,
} from "../../components/index";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { fonts, spacing, colors } from "../../styles/index";
import registrationSecondFormSchema from "../../schema/registrationSecondForm";
import { openImageAndDocumentPicker } from "../../utility";
import { constants } from "../../constants";

const RegistrationSecondForm = ({
  activePage,
  setActivePage,
  setRegistrationData,
  registrationData,
  setHubListData,
  hubList,
}) => {
  const { t } = useTranslation();
  const { aadharMask, licenseNoMask, panNoMask } = constants.masks;

  useEffect(() => {
    setHubListData();
  }, []);

  const handleSubmit = (data) => {
    setRegistrationData({ ...registrationData, ...data });
    setActivePage(2);
  };

  let addressRef,
    pincodeRef = useRef();

  return (
    <WithContainer
      isLoading={false}
      isHeader={false}
      isRefreshControl={false}
      contentStyle={styles.content}
    >
      <Formik
        initialValues={{
          documentType: "aadhar",
          documentNo: "",
          documentFileName: "",
          documentObj: {
            uri: "",
            name: "",
          },
          hubID: "",
          address: "",
          pincode: "",
        }}
        validationSchema={() => registrationSecondFormSchema(t)}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          setValues,
        }) => {
          return (
            <>
              <View style={styles.radioGroup}>
                <RadioButton
                  text={t("registration.aadharRadioPlaceholder")}
                  selected={values.documentType === "aadhar"}
                  onClick={(value) => {
                    if (value) {
                      setValues({
                        ...values,
                        documentType: "aadhar",
                        documentNo: "",
                        documentFileName: "",
                        documentObj: {
                          uri: "",
                          name: "",
                        },
                      });
                    }
                  }}
                  textStyle={styles.radioText}
                />
                <RadioButton
                  text={t("registration.licenseRadioPlaceholder")}
                  selected={values.documentType === "driving_license"}
                  onClick={(value) => {
                    if (value) {
                      setValues({
                        ...values,
                        documentType: "driving_license",
                        documentNo: "",
                        documentFileName: "",
                        documentObj: {
                          uri: "",
                          name: "",
                        },
                      });
                    }
                  }}
                  textStyle={styles.radioText}
                />
                <RadioButton
                  text={t("registration.panRadioPlaceholder")}
                  selected={values.documentType === "pan"}
                  onClick={(value) => {
                    if (value) {
                      setValues({
                        ...values,
                        documentType: "pan",
                        documentNo: "",
                        documentFileName: "",
                        documentObj: {
                          uri: "",
                          name: "",
                        },
                      });
                    }
                  }}
                  textStyle={styles.radioText}
                />
              </View>

              {values.documentType === "aadhar" ? (
                <MaskedInput
                  mask={aadharMask}
                  placeholder={t("registration.aadharNoPlaceholder")}
                  isPassword={false}
                  onChange={(maskedValue) => {
                    setFieldValue("documentNo", maskedValue);
                  }}
                  error={errors.documentNo}
                  showError={touched.documentNo && errors.documentNo}
                  value={values.documentNo}
                  onBlur={() =>
                    !touched.documentNo &&
                    setFieldTouched("documentNo", true, true)
                  }
                  onSubmitEditing={() => {
                    addressRef?._root?.focus?.();
                  }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={[styles.inputParent, { marginTop: 10 }]}
                />
              ) : null}
              {values.documentType === "driving_license" ? (
                <MaskedInput
                  mask={licenseNoMask}
                  placeholder={t("registration.licenseNoPlaceholder")}
                  isPassword={false}
                  onChange={(maskedValue) => {
                    setFieldValue("documentNo", maskedValue);
                  }}
                  error={errors.documentNo}
                  showError={touched.documentNo && errors.documentNo}
                  value={values.documentNo}
                  onBlur={() =>
                    !touched.documentNo &&
                    setFieldTouched("documentNo", true, true)
                  }
                  onSubmitEditing={() => {
                    addressRef?._root?.focus?.();
                  }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={[styles.inputParent, { marginTop: 10 }]}
                />
              ) : null}
              {values.documentType === "pan" ? (
                <MaskedInput
                  mask={panNoMask}
                  placeholder={t("registration.panNoPlaceholder")}
                  isPassword={false}
                  onChange={(maskedValue) => {
                    setFieldValue("documentNo", maskedValue);
                  }}
                  error={errors.documentNo}
                  showError={touched.documentNo && errors.documentNo}
                  value={values.documentNo}
                  onBlur={() =>
                    !touched.documentNo &&
                    setFieldTouched("documentNo", true, true)
                  }
                  onSubmitEditing={() => {
                    addressRef?._root?.focus?.();
                  }}
                  withOutItem={false}
                  inputStyle={styles.input}
                  viewStyle={[styles.inputParent, { marginTop: 10 }]}
                />
              ) : null}

              <View style={styles.rowView}>
                <Input
                  viewStyle={styles.buttonFirstColumn}
                  placeholder={
                    values.documentType === "aadhar"
                      ? t("registration.aadharPhotoPlaceholder")
                      : values.documentType === "driving_license"
                      ? t("registration.licensePhotoPlaceholder")
                      : t("registration.panPhotoPlaceholder")
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
                  selection={{ start: 0, end: 0 }}
                />
                <Button
                  text={t("registration.buttons.upload")}
                  onClick={() => {
                    openImageAndDocumentPicker((selectedFile) => {
                      selectedFile &&
                        selectedFile.name &&
                        setFieldValue("documentFileName", selectedFile.name);
                      selectedFile.uri &&
                        setFieldValue("documentObj", selectedFile);
                      setTimeout(
                        () =>
                          !touched.fitnessExpiryPhoto &&
                          setFieldTouched("documentFileName", true, true),
                        1000
                      );
                    });
                  }}
                  style={styles.buttonSecondColumn}
                  textStyle={styles.buttonText}
                />
              </View>
              <View style={{ marginBottom: 30 }}>
                <Dropdown
                  selectedValue={values.hubID}
                  options={[
                    {
                      label: t("registration.selectHubPlaceholder"),
                      value: "",
                    },
                    ...(hubList || []),
                  ]}
                  onChange={(value) => {
                    setFieldValue("hubID", value);
                    setTimeout(
                      () =>
                        !touched.hubID && setFieldTouched("hubID", true, true),
                      1000
                    );
                  }}
                  parentStyle={{ marginTop: 0 }}
                  error={errors.hubID}
                  showError={touched.hubID && errors.hubID}
                />
              </View>
              <Input
                inputStyle={styles.textarea}
                viewStyle={styles.inputParent}
                isPassword={false}
                onChange={(value) => setFieldValue("address", value)}
                error={errors.address}
                showError={touched.address && errors.address}
                value={values.address}
                onBlur={() =>
                  !touched.address && setFieldTouched("address", true, true)
                }
                inputRef={(inputRef) => {
                  addressRef = inputRef;
                }}
                onSubmitEditing={() => {
                  pincodeRef?._root?.focus?.();
                }}
                multiline={true}
                placeholder={t("registration.addressPlaceholder")}
                withOutItem={false}
                maxLength={500}
              />
              <Input
                placeholder={t("registration.pincodePlaceholder")}
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
              />
              <Button
                text={t("registration.buttons.next")}
                onClick={handleSubmit}
                // onClick={() => setActivePage(2)}
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
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
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
    marginBottom: 10,
  },
  radioText: {
    fontSize: fonts.sizeLG,
  },
  textarea: {
    maxHeight: 100,
    paddingBottom: 4,
    textAlignVertical: "bottom",
    // paddingTop: 4,
    // paddingBottom: 0,
    marginTop: 8,
  },
});

export default RegistrationSecondForm;
