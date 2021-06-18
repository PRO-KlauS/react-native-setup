import React, { useRef } from "react";
import {
  WithContainer,
  Input,
  Button,
  PagerDotBar,
  MaskedInput,
} from "../../components/index";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { fonts, spacing, colors } from "../../styles/index";
import registrationThirdFormSchema from "../../schema/registrationThirdForm";
import { constants } from "../../constants";

const RegistrationThirdForm = ({
  activePage,
  setActivePage,
  setRegistrationData,
  registrationData,
}) => {
  const { t } = useTranslation();
  const { vehicleNoMask } = constants.masks;

  const handleSubmit = (data) => {
    setRegistrationData({ ...registrationData, ...data });
    setActivePage(3);
  };

  let ifscCodeRef,
    accountNoRef,
    // branchAddressRef,
    // branchPincodeRef,
    vehicleRegNoRef,
    insuranceNoRef = useRef();

  return (
    <WithContainer
      isLoading={false}
      isHeader={false}
      isRefreshControl={false}
      contentStyle={styles.content}
    >
      <Formik
        initialValues={{
          bankName: "",
          ifscCode: "",
          accountNo: "",
          // branchAddress: "",
          // branchPincode: "",
          vehicleRegNo: "",
          insurancePolicyNo: "",
        }}
        validationSchema={() => registrationThirdFormSchema(t)}
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
                placeholder={t("registration.bankNamePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("bankName", value)}
                error={errors.bankName}
                showError={touched.bankName && errors.bankName}
                value={values.bankName}
                onBlur={() =>
                  !touched.bankName && setFieldTouched("bankName", true, true)
                }
                onSubmitEditing={() => {
                  ifscCodeRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={[styles.inputParent, { marginTop: 10 }]}
              />
              <Input
                placeholder={t("registration.ifscCodePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("ifscCode", value)}
                error={errors.ifscCode}
                showError={touched.ifscCode && errors.ifscCode}
                value={values.ifscCode}
                onBlur={() =>
                  !touched.ifscCode && setFieldTouched("ifscCode", true, true)
                }
                inputRef={(inputRef) => {
                  ifscCodeRef = inputRef;
                }}
                onSubmitEditing={() => {
                  accountNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.accountNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("accountNo", value)}
                error={errors.accountNo}
                showError={touched.accountNo && errors.accountNo}
                value={values.accountNo}
                onBlur={() =>
                  !touched.accountNo && setFieldTouched("accountNo", true, true)
                }
                inputRef={(inputRef) => {
                  accountNoRef = inputRef;
                }}
                onSubmitEditing={() => {
                  vehicleRegNoRef?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
                keyboardType="number-pad"
              />
              {/* <Input
                inputStyle={styles.textarea}
                viewStyle={styles.inputParent}
                viewStyle={{
                  marginTop: 10,
                }}
                isPassword={false}
                onChange={(value) => setFieldValue("branchAddress", value)}
                error={errors.branchAddress}
                showError={touched.branchAddress && errors.branchAddress}
                value={values.branchAddress}
                onBlur={() =>
                  !touched.branchAddress &&
                  setFieldTouched("branchAddress", true, true)
                }
                inputRef={(inputRef) => {
                  branchAddressRef = inputRef;
                }}
                onSubmitEditing={() => {
                  branchPincodeRef?._root?.focus?.();
                }}
                multiline={true}
                placeholder={t("registration.branchAddressPlaceholder")}
                withOutItem={false}
                maxLength={500}
              />
              <Input
                placeholder={t("registration.branchPincodePlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("branchPincode", value)}
                error={errors.branchPincode}
                showError={touched.branchPincode && errors.branchPincode}
                value={values.branchPincode}
                onBlur={() =>
                  !touched.branchPincode &&
                  setFieldTouched("branchPincode", true, true)
                }
                inputRef={(inputRef) => {
                  branchPincodeRef = inputRef;
                }}
                onSubmitEditing={() => {
                  vehicleRegNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
                keyboardType="number-pad"
              /> */}
              <MaskedInput
                mask={vehicleNoMask}
                placeholder={t("registration.vehicleRegistrationNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("vehicleRegNo", value)}
                error={errors.vehicleRegNo}
                showError={touched.vehicleRegNo && errors.vehicleRegNo}
                value={values.vehicleRegNo}
                onBlur={() =>
                  !touched.vehicleRegNo &&
                  setFieldTouched("vehicleRegNo", true, true)
                }
                inputRef={(inputRef) => {
                  vehicleRegNoRef = inputRef;
                }}
                onSubmitEditing={() => {
                  insuranceNoRef?._root?.focus?.();
                }}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Input
                placeholder={t("registration.insuranceNoPlaceholder")}
                isPassword={false}
                onChange={(value) => setFieldValue("insurancePolicyNo", value)}
                error={errors.insurancePolicyNo}
                showError={
                  touched.insurancePolicyNo && errors.insurancePolicyNo
                }
                value={values.insurancePolicyNo}
                onBlur={() =>
                  !touched.insurancePolicyNo &&
                  setFieldTouched("insurancePolicyNo", true, true)
                }
                inputRef={(inputRef) => {
                  insuranceNoRef = inputRef;
                }}
                onSubmitEditing={handleSubmit}
                isSubmit={true}
                withOutItem={false}
                inputStyle={styles.input}
                viewStyle={styles.inputParent}
              />
              <Button
                text={t("registration.buttons.next")}
                onClick={handleSubmit}
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

export default RegistrationThirdForm;
