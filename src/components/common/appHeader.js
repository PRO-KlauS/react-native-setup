import React from "react";
import { StyleSheet } from "react-native";
import { Header, Left, Body, Icon, Text, Right } from "native-base";
import { Ripple } from "../index";
import { colors, spacing, fonts } from "../../styles/index";

const AppHeader = ({
  title,
  onLeftIconClick,
  leftIcon,
  rightIcon,
  actionIcon,
  onRightIconClick,
  leftIconType,
}) => {
  return (
    <Header androidStatusBarColor={"#263238"} style={styles.header}>
      {onLeftIconClick ? (
        <Left style={styles.section}>
          <Ripple
            onPress={onLeftIconClick}
            style={styles.ripple}
            rippleContainerBorderRadius={40}
            rippleCentered
          >
            <Icon
              name={leftIcon}
              type={leftIconType || "MaterialIcons"}
              style={styles.leftIcon}
            />
          </Ripple>
        </Left>
      ) : (
        <Left style={styles.section} />
      )}
      <Body style={styles.body}>
        <Text style={styles.title}>{title}</Text>
      </Body>
      <Right style={styles.section}>
        {rightIcon && (
          <Ripple
            rippleCentered
            style={styles.ripple}
            rippleContainerBorderRadius={40}
            onPress={onRightIconClick}
          >
            <Icon name={rightIcon} style={styles.leftIcon} />
          </Ripple>
        )}
        {actionIcon && (
          <Ripple
            style={styles.ripple}
            rippleContainerBorderRadius={40}
            rippleCentered
          >
            <Icon name={actionIcon} style={styles.leftIcon} />
          </Ripple>
        )}
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.backgroundSecondary,
    elevation: 5,
    height: 50,
  },
  leftIcon: {
    color: colors.iconWhite,
    padding: spacing.sm,
    fontSize: fonts.sizeXXXL,
  },
  section: {
    flex: 1,
    maxWidth: 40,
  },
  body: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 20,
  },
  title: {
    color: colors.textWhite,
    fontWeight: fonts.weightBold,
    fontSize: fonts.sizeXXL,
    alignSelf: "center",
  },
  ripple: {
    height: 40,
    width: 40,
    alignItems: "center",
  },
});

export default AppHeader;
