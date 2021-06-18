import React from "react";
import { Text, StyleSheet } from "react-native";
import { ListItem, Radio, Icon } from "native-base";
import { colors, fonts, spacing } from "../../styles/index";

const RadioButton = ({
  style,
  text,
  selected,
  onClick,
  textStyle,
  iconName,
  iconType,
  iconStyle,
  disabled,
}) => {
  const doNothing = () => {};
  return (
    <ListItem
      style={[styles.listItem, style]}
      onPress={!disabled ? onClick : doNothing}
    >
      <Radio
        selectedColor={colors.textPrimary}
        onPress={!disabled ? onClick : doNothing}
        selected={selected}
        color={colors.textPrimary}
      />
      {text && <Text style={[styles.textStyle, textStyle]}>{text}</Text>}
      {iconName && (
        <Icon
          name={iconName}
          type={iconType}
          style={[styles.iconStyle, iconStyle]}
        />
      )}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 32,
    color: colors.iconGray,
  },
  textStyle: {
    paddingLeft: spacing.sm,
    fontSize: fonts.sizeXL,
    color: colors.textGray,
    marginTop: -3,
  },
  listItem: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadioButton;
