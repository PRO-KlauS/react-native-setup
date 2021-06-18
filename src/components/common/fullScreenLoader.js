import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import { Modal, Loader } from "../index";

const FullScreenLoader = (isModalVisible) => {
  return (
    <Modal isModalVisible={isModalVisible} style={styles.modalParentView}>
      <View style={styles.mainView}>
        <Loader hasLoader={true} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalParentView: {
    backgroundColor: "transparent",
  },
  mainView: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "relative",
    flex: 1,
  },
});
export default FullScreenLoader;
