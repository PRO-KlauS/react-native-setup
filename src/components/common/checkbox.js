import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { CheckBox } from "native-base";
import { colors, fonts } from "../../styles/index";
import { Ripple } from "../index";

const CheckBoxList = ({
  style,
  checked,
  text,
  onClick,
  parentView,
  disabled,
  textStyle,
}) => {
  return (
    <View style={parentView}>
      <Ripple style={styles.parentView} onPress={onClick} disabled={disabled}>
        <CheckBox
          checked={checked}
          style={[
            styles.checkBox,
            style,
            {
              borderColor: colors.borderPrimary,
            },
          ]}
          color={colors.backgroundPrimary}
          onPress={onClick}
        />
        {text ? (
          <Text style={[styles.textStyle, textStyle]}>{text}</Text>
        ) : null}
      </Ripple>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: fonts.sizeLG,
    // lineHeight: 20,
    color: colors.textGray,
    paddingLeft: 30,
  },
  checkBox: {
    marginLeft: -10,
    paddingLeft: 0,
  },
  parentView: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
export default CheckBoxList;
