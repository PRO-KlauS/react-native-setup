import React from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import AppHeader from "./appHeader";
import Loader from "./loader";
import { NoInternetAlert, Fab } from "../index";
import { colors } from "../../styles";

const WithContainer = ({
  title,
  onLeftIconClick,
  leftIcon,
  isLoading,
  contentStyle,
  containerStyle,
  refreshing,
  onRefresh,
  children,
  isRefreshControl,
  noContent,
  isHeader,
  rightIcon,
  actionIcon,
  onRightIconClick,
  hasFab,
  onFabClick,
  parentContainer,
}) => {
  let content = noContent ? (
    children
  ) : (
    <Content
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.container, containerStyle]}
      style={[styles.content, contentStyle]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={isRefreshControl}
        />
      }
    >
      {children}
    </Content>
  );

  return (
    <Container style={[styles.parentContainer, parentContainer]}>
      {isHeader && (
        <AppHeader
          title={title}
          onLeftIconClick={onLeftIconClick}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          actionIcon={actionIcon}
          onRightIconClick={onRightIconClick}
        />
      )}
      {isLoading ? <Loader /> : content}
      {hasFab && <Fab onClick={onFabClick} />}
      <NoInternetAlert />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backGroundWhite,
  },
  parentContainer: {
    backgroundColor: colors.backGroundWhite,
  },
  content: {
    backgroundColor: colors.backGroundWhite,
  },
});

export default WithContainer;
