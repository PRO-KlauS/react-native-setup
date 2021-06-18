import React from "react";
import { StyleSheet } from "react-native";
import { Fab as NativeFab, Icon } from "native-base";
import { colors } from "../../styles";
import { constants } from "../../constants";

const Fab = ({ onClick }) => {
  const { icons } = constants;
  return (
    <NativeFab
      direction="up"
      style={styles.fab}
      position="bottomRight"
      onPress={onClick}
    >
      <Icon
        name={icons.plus.name}
        type={icons.plus.type}
        style={styles.plusIcon}
      />
    </NativeFab>
  );
};
const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 50,
  },
  plusIcon: {
    color: colors.iconWhite,
    fontSize: 28,
  },
});

export default Fab;
