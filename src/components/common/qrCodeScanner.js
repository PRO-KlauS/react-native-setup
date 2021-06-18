import React from "react";
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";

const QRCodeScanner = ({}) => {
  return (
    <RNCamera
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: "Permission to use camera",
        message: "We need your permission to use your camera",
        buttonPositive: "Ok",
        buttonNegative: "Cancel",
      }}
      onGoogleVisionBarcodesDetected={({ barcodes }) => {
        console.log(barcodes);
      }}
    >
      <BarcodeMask />
    </RNCamera>
  );
};

export default QRCodeScanner;
