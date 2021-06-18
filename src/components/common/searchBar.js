import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Item, Icon, Input } from "native-base";
import { colors, spacing, fonts } from "../../styles";
import { constants } from "../../constants";

const SearchBar = ({ value, onChange, style, placeholder }) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const { icons } = constants;
  return (
    <Item
      style={[
        styles.item,
        {
          borderColor: focused ? colors.borderPrimary : colors.borderGray,
        },
        style,
      ]}
    >
      <Icon
        style={[
          { color: focused ? colors.iconPrimary : colors.iconGray },
          styles.iconStyle,
        ]}
        name={icons.search.name}
        type={icons.search.type}
      />
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: fonts.sizeMD,
    color: colors.textBlack,
    paddingBottom: 0,
  },
  item: {
    paddingTop: 5,
    // paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    color: colors.textBlack,
    backgroundColor: colors.backGroundWhite,
    borderRadius: 4,
    fontSize: fonts.sizeMD,
  },
  iconStyle: {
    fontSize: 20,
    marginBottom: -10,
  },
});

export default SearchBar;
