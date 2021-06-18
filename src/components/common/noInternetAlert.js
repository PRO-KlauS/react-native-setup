import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { colors } from "../../styles";

const { width } = Dimensions.get("window");

const NoInternetAlert = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    let unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return unsubscribe;
  });
  if (!isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: colors.backgroundRed,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    bottom: 0,
    zIndex: 10000,
  },
  offlineText: { color: colors.textWhite },
});

export default NoInternetAlert;
