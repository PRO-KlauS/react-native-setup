import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Row, Col } from "native-base";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { WithContainer, Loader, Button } from "../components/index";
import { getInvoiceDetails } from "../api/invoice";
import { fonts, colors } from "../styles/index";
import {
  useStateCallback,
  showToast,
  downloadFileFromURL,
  formatDate,
} from "../utility";
import { constants } from "../constants";

const InvoiceDetails = ({ navigation, route }) => {
  const [state, setState] = useStateCallback({
    isLoading: true,
    invoiceData: {},
    isButtonLoading: false,
  });
  const { driverID } = useSelector((state) => ({
    driverID: state?.user?.driverId,
  }));
  const { isLoading, invoiceData = {}, isButtonLoading } = state;
  const {
    //  date,
    invoiceNo,
    chassisNo,
    transactionMode,
    amount,
    // url
  } = invoiceData || {};
  const { invoiceID } = route?.params || {};
  const { t } = useTranslation();
  const { icons, currencySign } = constants;

  useEffect(() => {
    // invoiceID &&
    //   driverID &&
    getInvoiceDetails(driverID, invoiceID)
      .then((res) => {
        if (res.data.success === true) {
          setState({
            ...state,
            isLoading: false,
            invoiceData: res.data?.data || {},
          });
        } else {
          showToast(res.data.errorMessage);
          setState({ ...state, isLoading: false });
        }
      })
      .catch(() => {
        setState({ ...state, isLoading: false });
      });
  }, []);

  const goBack = () => navigation.goBack();

  const onDownload = () => {
    // http://www.africau.edu/images/default/sample.pdf
    // https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf

    // url &&
    // setState({ ...state, isButtonLoading: true }, () => {
    downloadFileFromURL(
      "https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf",
    );
    // "",
    //   () => {
    //     setState({ ...state, isButtonLoading: false });
    //   }
    // ),
    //   () => {
    //     setState({ ...state, isButtonLoading: false });
    //   };
    // });
  };

  return (
    <WithContainer
      contentStyle={styles.content}
      isHeader
      title={t("invoiceDetails.headerTitle")}
      isRefreshControl={false}
      leftIcon={icons.arrowBack.name}
      onLeftIconClick={goBack}>
      {isLoading ? (
        <Loader
          hasLoaderText
          hasLoader
          parentStyle={{
            height: Dimensions.get("window").height - 120,
            backgroundColor: colors.backgroundLightGray,
          }}
        />
      ) : (
        <>
          <View style={styles.invoiceParent}>
            <Row style={styles.row}>
              <Col style={styles.firstCol}>
                <Text style={[styles.label]}>
                  {t("invoiceDetails.datePlaceholder")}
                </Text>
              </Col>
              <Col style={styles.secondCol}>
                <Text style={styles.value}>
                  {formatDate(new Date()) || "-"}
                </Text>
              </Col>
            </Row>

            <Row style={styles.row}>
              <Col style={styles.firstCol}>
                <Text style={[styles.label]}>
                  {t("invoiceDetails.invoiceNoPlaceholder")}
                </Text>
              </Col>
              <Col style={styles.secondCol}>
                <Text style={styles.value}>{invoiceNo || "-"}</Text>
              </Col>
            </Row>

            <Row style={styles.row}>
              <Col style={styles.firstCol}>
                <Text style={[styles.label]}>
                  {t("invoiceDetails.evNoPlaceholder")}
                </Text>
              </Col>
              <Col style={styles.secondCol}>
                <Text style={styles.value}>{chassisNo || "-"}</Text>
              </Col>
            </Row>

            <Row style={styles.row}>
              <Col style={styles.firstCol}>
                <Text style={[styles.label]}>
                  {t("invoiceDetails.transactionModePlaceholder")}
                </Text>
              </Col>
              <Col style={styles.secondCol}>
                <Text style={styles.value}>{transactionMode || "-"}</Text>
              </Col>
            </Row>

            <Row style={styles.row}>
              <Col style={styles.firstCol}>
                <Text style={[styles.label]}>
                  {t("invoiceDetails.amountPlaceholder")}
                </Text>
              </Col>
              <Col style={styles.secondCol}>
                <Text style={styles.value}>
                  {amount ? currencySign + amount : "-"}
                </Text>
              </Col>
            </Row>
          </View>
          <View style={styles.separator} />
          <Button
            text={t("invoiceDetails.buttons.download")}
            onClick={onDownload}
            disabled={isButtonLoading}
            isLoading={isButtonLoading}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </>
      )}
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
    backgroundColor: colors.backgroundLightGray,
  },
  invoiceParent: {
    backgroundColor: colors.backGroundWhite,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderMediumGray,
    // marginBottom: 20,
    borderRadius: 8,
  },
  separator: {
    backgroundColor: colors.backgroundLightGray,
    height: 20,
  },
  row: {
    marginBottom: 10,
  },
  firstCol: {
    marginRight: 10,
    flexDirection: "row",
  },
  secondCol: {
    marginLeft: 10,
    flexDirection: "row",
    // alignItems: "center",
  },
  label: {
    fontSize: fonts.sizeXL,
    color: colors.textGray,
  },
  value: {
    fontSize: fonts.sizeXL,
  },
  button: {
    width: "100%",
    marginTop: 0,
    marginBottom: 0,
  },
  buttonText: {
    fontSize: fonts.sizeXL,
  },
});

export default InvoiceDetails;
