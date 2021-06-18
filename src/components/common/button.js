import React from "react";
import { Text, StyleSheet, Keyboard, Platform } from "react-native";
import { Spinner, Icon } from "native-base";
import { Ripple } from "../index";
import { colors, spacing, fonts } from "../../styles/index";

const ThemedButton = ({
  style,
  onClick,
  text,
  disabled,
  icon,
  isLoading,
  iconType,
  textStyle,
  buttonIconStyle,
}) => {
  let isIOS = Platform.OS === "ios";
  const onButtonClick = () => {
    Keyboard.dismiss();
    onClick();
  };
  return (
    <Ripple
      style={[
        styles.button,
        style,
        isIOS && {
          paddingTop: 0,
          paddingBottom: 0,
        },
      ]}
      disabled={disabled}
      rippleContainerBorderRadius={8}
      onPress={!isLoading ? onButtonClick : null}
    >
      {isLoading ? (
        <Spinner
          size="small"
          style={styles.textStyle}
          color={colors.iconWhite}
        />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              type={iconType}
              style={[styles.buttonIcon, buttonIconStyle]}
            />
          )}
          <Text style={[styles.textStyle, textStyle]}>{text}</Text>
        </>
      )}
    </Ripple>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: fonts.sizeXL,
    fontWeight: fonts.weightBold,
    color: colors.textWhite,
    alignSelf: "center",
    height: 20,
    // height: 20,
    // display: "flex",
  },
  button: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.sm,
    width: 180,
    margin: spacing.sm,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonIcon: {
    color: colors.iconWhite,
    paddingTop: spacing.sm,
    position: "relative",
    top: 4,
  },
});
export default ThemedButton;
