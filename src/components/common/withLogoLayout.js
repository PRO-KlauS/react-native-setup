import React from "react";
import { WithContainer } from "../index";
import { StyleSheet, View } from "react-native";
// import appLogo from "../assets/Patidar-Travels.png";

const WithLogoLayout = ({
  style,
  children,
  isHeader,
  title,
  leftIcon,
  onLeftIconClick,
}) => {
  return (
    <WithContainer
      title={title}
      isHeader={isHeader}
      leftIcon={leftIcon}
      onLeftIconClick={onLeftIconClick}
      isRefreshControl={false}
    >
      {/* <Image source={appLogo} style={styles.logo} /> */}
      <View style={[styles.parentView, style]}>{children}</View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    padding: 40,
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: 210,
  },
});
export default WithLogoLayout;
