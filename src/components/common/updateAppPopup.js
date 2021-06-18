import React from "react";
import { Text, StyleSheet, Linking, Platform } from "react-native";
import { View, List, ListItem } from "native-base";
import { useTranslation } from "react-i18next";
import { colors } from "../../styles/index";
import { Modal, Button } from "../index";

const UpdateAPPPopup = () => {
  const { t } = useTranslation();
  let isIOS = Platform.OS === "ios";

  const onUpdateClick = () => {
    Linking.openURL(
      isIOS
        ? "itms-apps://itunes.apple.com/app/idHK72F56XT5" // Change the ID before production
        : "https://play.google.com/store/apps/details?id=com.react_native_setup" // Change the ID before production
    );
  };

  return (
    <Modal isModalVisible={true}>
      <View style={styles.mainView}>
        <List>
          <ListItem style={styles.heading}>
            <Text style={styles.headingText}>{t("updateAppPopup.title")}</Text>
          </ListItem>
          <ListItem style={[styles.listItem]}>
            <Text style={styles.listData}>{t("updateAppPopup.body")}</Text>
          </ListItem>
        </List>
        <View style={styles.buttonParent}>
          <Button
            text={t("updateAppPopup.updateButton")}
            onClick={onUpdateClick}
            style={styles.button}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalParentView: {
    backgroundColor: colors.backgroundLightGray,
  },
  mainView: {
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 8,
    position: "relative",
  },
  listHeader: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-start",
    color: colors.textPrimary,
  },
  listItem: {
    flexDirection: "column",
    marginRight: 20,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
  listData: {
    alignSelf: "flex-start",
    fontSize: 15,
  },
  headingText: {
    color: colors.textPrimary,
    fontSize: 18,
    alignSelf: "center",
  },
  heading: {
    backgroundColor: colors.textPrimary + "12",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 0,
    borderBottomWidth: 0,
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    height: 35,
    width: "100%",
  },
  buttonParent: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    // height: 44,
  },
  buttonTextStyle: {
    color: colors.textWhite,
    fontSize: 16,
    // borderBottomColor: colors.borderPrimary,
    // paddingBottom: 0,
    // borderBottomWidth: 1,
  },
});
export default UpdateAPPPopup;
