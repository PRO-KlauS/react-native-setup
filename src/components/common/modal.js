import React from "react";
import ReactNativeModal from "react-native-modal";

const Modal = ({ isModalVisible, children, style, onBackButtonPress }) => (
  <ReactNativeModal
    isVisible={isModalVisible}
    // hasBackdrop={true}
    // backdropColor="#000"
    // backdropOpacity={0.6}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    // animationInTiming={500}
    // animationOutTiming={500}
    // backdropTransitionInTiming={500}
    // backdropTransitionOutTiming={500}
    avoidKeyboard={true}
    style={style}
    onBackButtonPress={onBackButtonPress}
    useNativeDriver={true}
    useNativeDriverForBackdrop={true}
  >
    {children}
  </ReactNativeModal>
);

export default Modal;
