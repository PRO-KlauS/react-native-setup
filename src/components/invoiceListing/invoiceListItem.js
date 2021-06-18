import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Row, Col, Icon } from "native-base";
import { Ripple } from "../index";
import { colors, spacing, fonts } from "../../styles/index";
import { constants } from "../../constants";

const InvoiceListItem = ({
  ev_number,
  amount,
  date,
  paymentMethod,
  onClick,
}) => {
  const { icons, currencySign } = constants;
  return (
    <Ripple
      style={styles.parent}
      onPress={onClick}
      rippleContainerBorderRadius={8}
    >
      <Row style={styles.row}>
        <Col style={styles.firstCol}>
          <Icon
            name={icons.car.name}
            type={icons.car.type}
            style={styles.carIcon}
          />
          <Text style={[styles.value, { marginTop: 0 }]}>{ev_number}</Text>
        </Col>
        <Col style={styles.secondCol}>
          <Icon
            name={icons.cash.name}
            type={icons.cash.type}
            style={styles.cashIcon}
          />
          <Text style={styles.value}>{currencySign + " " + amount}</Text>
        </Col>
      </Row>
      <Row style={styles.row}>
        <Col style={styles.firstCol}>
          <Icon
            name={icons.calendar.name}
            type={icons.calendar.type}
            style={styles.calendarIcon}
          />
          <Text style={[styles.value, { marginTop: 0 }]}>{date}</Text>
        </Col>
        <Col style={styles.secondCol}>
          <Icon
            name={icons.payment.name}
            type={icons.payment.type}
            style={styles.paymentIcon}
          />
          <Text style={styles.value}>{paymentMethod}</Text>
        </Col>
      </Row>
    </Ripple>
  );
};
const styles = StyleSheet.create({
  parent: {
    marginVertical: spacing.sm,
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 8,
    padding: 10,
    paddingBottom: 0,
  },
  carIcon: {
    color: colors.iconGray,
    fontSize: 24,
    marginTop: -3,
  },
  cashIcon: {
    color: colors.iconGray,
    fontSize: 20,
  },
  paymentIcon: {
    color: colors.iconGray,
    fontSize: 20,
  },
  calendarIcon: {
    color: colors.iconGray,
    fontSize: 26,
  },
  value: {
    marginLeft: 10,
    fontSize: fonts.sizeLG,
    marginRight: 20,
  },
  row: {
    marginBottom: 10,
  },
  firstCol: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  secondCol: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
export default InvoiceListItem;
