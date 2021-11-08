import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Picker } from "native-base";
// import { Picker } from "@react-native-picker/picker";
import { colors, spacing, fonts } from "../../styles";
import { constants } from "../../constants";

const SortDropdown = ({
  selectedValue,
  onChange,
  options,
  style,
  parentStyle,
  placeholder,
  showError,
  error,
  disabled,
  prompt,
}) => {
  const { icons } = constants;
  return (
    <>
      <View
        style={[
          styles.parentView,
          {
            marginBottom: 0,
            borderColor:
              showError && error ? colors.borderRed : colors.borderGray,
          },
          parentStyle,
        ]}>
        <View style={styles.iconParent}>
          <Text style={styles.sortText}>Sort</Text>
          <Icon
            name={icons.sort.name}
            type={icons.sort.type}
            style={styles.sortIcon}
          />
        </View>
        <Picker
          mode="dialog"
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
          // dropdownIconColor={colors.iconLightGray}
          prompt={prompt}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          selectedValue={selectedValue}
          onValueChange={onChange}>
          {options.map((option) => (
            <Picker.Item
              label={option.label}
              value={option.value}
              color={selectedValue === option.value && colors.textGray}
              key={option.value}
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 0,
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  picker: {
    color: colors.textGray,
    fontSize: fonts.sizeXL,
    fontWeight: fonts.weight600,
    padding: 0,
    margin: 0,
    opacity: 0,
  },
  errorText: {
    alignSelf: "flex-start",
    color: colors.textRed,
    fontSize: fonts.sizeMD,
    lineHeight: 20,
  },
  placeholder: {
    color: colors.placeholderGray,
  },
  iconParent: {
    height: 38,
    backgroundColor: colors.backgroundLightGray,
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sortIcon: {
    fontSize: 16,
    color: colors.iconGray,
    marginLeft: 5,
  },
  sortText: {
    // marginLeft: 10,
  },
});

export default SortDropdown;
