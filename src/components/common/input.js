import React, { useState } from "react";
import { Input, Item, Icon, View, Text, Label } from "native-base";
import { colors, fonts } from "../../styles";
import { StyleSheet } from "react-native";
import { constants } from "../../constants";

const CommonTextInput = ({
  showError,
  placeholder,
  isPassword,
  error,
  value,
  onChange,
  viewStyle,
  onBlur,
  disabled,
  keyboardType,
  onSubmitEditing,
  isSubmit,
  selection,
  inputStyle,
  itemStyle,
  multiline,
  numberOfLines,
  inputPlaceholder,
  withOutItem,
  maxLength,
  inputRef,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const { icons } = constants;

  const handleOnBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const getColor = () => {
    if (showError) {
      return colors.textRed;
    } else {
      if (isFocused) {
        return colors.textPrimary;
      }
      return colors.textGray;
    }
  };

  const displayIcon = () => {
    let color = isFocused ? colors.iconPrimary : colors.iconGray;
    if (isPassword) {
      if (hidePassword) {
        return (
          <Icon
            name={icons.eyeSlash.name}
            type={icons.eyeSlash.type}
            onPress={managePasswordVisibility}
            style={[
              {
                color: color,
                // marginTop: -5,
                position: "absolute",
                right: 10,
                top: 15,
                marginTop: 0,
                fontSize: 22,
              },
              withOutItem && {
                position: "absolute",
                right: 10,
                top: 12,
                marginTop: 0,
                fontSize: 22,
              },
            ]}
          />
        );
      }
      return (
        <Icon
          name={icons.eye.name}
          type={icons.eye.type}
          onPress={managePasswordVisibility}
          style={[
            {
              color: color,
              // marginTop: -5,
              position: "absolute",
              right: 10,
              top: 15,
              marginTop: 0,
              fontSize: 22,
            },
            withOutItem && {
              position: "absolute",
              right: 10,
              top: 12,
              marginTop: 0,
              fontSize: 22,
            },
          ]}
        />
      );
    }
    return null;
  };

  return (
    <View style={viewStyle}>
      {withOutItem ? (
        <>
          <Input
            disabled={disabled}
            placeholderTextColor={
              error && showError ? colors.textRed : colors.placeholderGray
            }
            textContentType={isPassword ? "none" : "emailAddress"}
            secureTextEntry={isPassword ? hidePassword : false}
            value={value}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChangeText={onChange}
            style={[
              styles.input,
              inputStyle,
              disabled && styles.disabledInput,
              {
                borderBottomColor: getColor(),
                borderBottomWidth: 1,
                marginBottom: showError ? 5 : 20,
              },
              isPassword && { paddingRight: 40 },
            ]}
            keyboardType={keyboardType || "default"}
            // getRef={inputRef}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={isSubmit ? "done" : "next"}
            selection={selection}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholder={inputPlaceholder}
            maxLength={maxLength}
            ref={inputRef}
          />
          {displayIcon()}
        </>
      ) : (
        <Item
          floatingLabel={placeholder}
          style={[
            styles.item,
            itemStyle,
            {
              borderBottomColor: getColor(),
              marginBottom: showError ? 10 : 20,
              paddingBottom: value ? 0 : 4,
            },
          ]}
        >
          {placeholder && !inputPlaceholder && (
            <Label style={([styles.label], { color: getColor() })}>
              {placeholder}
            </Label>
          )}
          <Input
            disabled={disabled}
            placeholderTextColor={
              error && showError ? colors.textRed : colors.placeholderGray
            }
            textContentType={isPassword ? "none" : "emailAddress"}
            secureTextEntry={isPassword ? hidePassword : false}
            value={value}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChangeText={onChange}
            style={[styles.input, inputStyle, disabled && styles.disabledInput]}
            keyboardType={keyboardType || "default"}
            getRef={inputRef}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={isSubmit ? "done" : "next"}
            selection={selection}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholder={inputPlaceholder}
            maxLength={maxLength}
            // ref={inputRef}
          />
          {displayIcon()}
        </Item>
      )}
      {showError && <Text style={[styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomColor: colors.borderGray,
  },
  errorText: {
    alignSelf: "flex-start",
    color: colors.textRed,
    fontSize: fonts.sizeMD,
    fontWeight: fonts.weight400,
    lineHeight: 20,
    marginBottom: 15,
  },
  input: {
    padding: 0,
    paddingLeft: 0,
    margin: 0,
    fontSize: fonts.sizeXL,
    color: colors.textBlack,
    // fontWeight: fonts.weight500,
    fontFamily: "sans-serif",
  },
  label: {
    color: colors.textGray,
    // fontSize: 10,
  },
  disabledInput: {
    color: colors.textGray,
  },
});

export default CommonTextInput;
