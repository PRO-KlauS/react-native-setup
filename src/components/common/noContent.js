import React from "react";
import { Text, StyleSheet } from "react-native";
import { View } from "native-base";
import { colors, spacing, fonts } from "../../styles/index";

const NoContent = ({ message, textStyle, style }) => {
  return (
    <View style={[styles.parentView, style]}>
      <Text style={[styles.text, textStyle]}>{message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  parentView: {
    padding: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.md,
    flex: 1,
    flexGrow: 1,
    height: "100%",
  },
  text: {
    fontSize: fonts.sizeXXL,
    color: colors.textBlack,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    marginBottom: spacing.sm,
  },
});
export default NoContent;
