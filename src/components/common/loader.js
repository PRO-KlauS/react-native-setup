import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Spinner } from "native-base";
import { colors, spacing } from "../../styles/index";

const Loader = ({ parentStyle, hasLoaderText, hasLoader }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.loader, parentStyle]}>
      {hasLoader && <Spinner color={colors.iconPrimary} />}
      {hasLoaderText && <Text style={styles.text}>{t("loaderText")}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  text: {
    marginTop: spacing.sm,
  },
  lottie: {
    height: 70,
    width: 70,
  },
});

export default Loader;
