import React, { useState } from "react";
import { colors, spacing, fonts } from "../../styles";
import { StyleSheet, View, Text } from "react-native";
import { Textarea } from "native-base";

const TextArea = ({
  placeholder,
  value,
  onChange,
  viewStyle,
  disabled,
  rows,
  textareaStyle,
  showError,
  error,
  onBlur,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnBlur = () => {
    onBlur && onBlur();
    setIsFocused(false);
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const getBorderColor = () => {
    if (showError) {
      return colors.borderRed;
    } else {
      if (isFocused) {
        return colors.borderPrimary;
      }
      return colors.borderGray;
    }
  };

  return (
    <View style={[styles.parentView, viewStyle]}>
      <Textarea
        placeholderTextColor={colors.placeholderGray}
        rowSpan={rows ? rows : 3}
        placeholder={placeholder}
        value={value}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={onChange}
        disabled={disabled}
        multiline={true}
        style={[
          styles.textarea,
          textareaStyle,
          { borderColor: getBorderColor() },
        ]}
        maxLength={maxLength}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    margin: spacing.sm,
  },
  textarea: {
    borderRadius: 4,
    borderBottomWidth: 1,
    fontSize: fonts.sizeMD,
    fontWeight: fonts.weight400,
    lineHeight: 20,
    color: colors.textBlack,
    // paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  errorText: {
    alignSelf: "flex-start",
    color: colors.textRed,
    fontSize: fonts.sizeMD,
    fontWeight: fonts.weight400,
    lineHeight: 20,
    // marginBottom: 15,
  },
});

export default TextArea;
