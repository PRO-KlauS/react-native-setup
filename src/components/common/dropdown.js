import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { Picker } from "@react-native-picker/picker";
import { colors, spacing, fonts } from "../../styles";

const Dropdown = ({
  selectedValue,
  onChange,
  options,
  style,
  parentStyle,
  placeholder,
  showError,
  error,
  disabled,
}) => {
  return (
    <>
      <View
        style={[
          styles.parentView,
          {
            marginBottom: 0,
            borderBottomColor:
              showError && error ? colors.borderRed : colors.borderGray,
          },
          parentStyle,
        ]}
      >
        <Picker
          mode="dropdown"
          enabled={!disabled}
          style={[
            styles.picker,
            {
              color: selectedValue
                ? colors.textBlack
                : showError
                ? colors.textRed
                : colors.textGray,
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          selectedValue={selectedValue}
          onValueChange={onChange}
        >
          {options.map((option, index) => (
            <Picker.Item
              label={option.label}
              value={option.value}
              color={index === 0 && colors.textGray}
            />
          ))}
        </Picker>
      </View>
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    margin: spacing.sm,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: spacing.lg,
    borderColor: colors.borderGray,
    borderBottomWidth: 1,
    padding: 0,
    paddingLeft: 0,
    height: 40,
  },
  picker: {
    color: colors.textGray,
    fontSize: fonts.sizeXL,
    fontWeight: fonts.weight600,
    padding: 0,
    paddingLeft: 0,
    margin: 0,
    marginLeft: -15,
  },
  errorText: {
    alignSelf: "flex-start",
    color: colors.textRed,
    fontSize: fonts.sizeMD,
    fontWeight: fonts.weight400,
    lineHeight: 20,
    marginTop: 8,
  },
  placeholder: {
    color: colors.placeholderGray,
    paddingLeft: 0,
    marginLeft: 0,
  },
});

export default Dropdown;
