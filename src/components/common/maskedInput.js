import React, { useEffect, useState } from "react";
import TextInputMask from "react-native-text-input-mask";
import { colors, fonts } from "../../styles";
import { StyleSheet, Animated, View } from "react-native";
import { Icon, Text } from "native-base";
import { constants } from "../../constants";

const MaskedInput = ({
  mask,
  showError,
  placeholder,
  isPassword,
  error,
  value,
  onChange,
  viewStyle,
  animatedParentStyle,
  onBlur,
  disabled,
  keyboardType,
  onSubmitEditing,
  isSubmit,
  selection,
  inputStyle,
  inputPlaceholder,
  withOutItem,
  maxLength,
  inputRef,
}) => {
  const _animatedIsFocused = new Animated.Value(!value ? 0 : 1);
  // useEffect(() => {
  //   _animatedIsFocused = new Animated.Value(!value ? 0 : 1);
  // }, []);
  useEffect(() => {
    Animated.timing(_animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
    }).start();
  });
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
              { color: color, marginTop: -5 },
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
            { color: color, marginTop: -5 },
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

  const labelStyle = {
    position: "absolute",
    left: 0,
    top: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -25],
    }),
    fontSize: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.textGray, colors.textBlack],
    }),
  };

  return (
    <View style={viewStyle}>
      {withOutItem ? (
        <>
          <TextInputMask
            mask={mask}
            editable={!disabled}
            placeholderTextColor={
              error && showError ? colors.textRed : colors.textGray
            }
            // textContentType={isPassword ? 'none' : 'emailAddress'}
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
            onSubmitEditing={onSubmitEditing}
            returnKeyType={isSubmit ? "done" : "next"}
            blurOnSubmit
            autoCapitalize="characters"
            selection={selection}
            placeholder={inputPlaceholder}
            maxLength={maxLength}
            ref={inputRef}
          />
          {displayIcon()}
        </>
      ) : (
        <View style={[{ marginTop: 20 }, animatedParentStyle]}>
          <Animated.Text style={[labelStyle, { color: getColor() }]}>
            {placeholder}
          </Animated.Text>
          <TextInputMask
            mask={mask}
            editable={!disabled}
            placeholderTextColor={
              error && showError ? colors.textRed : colors.textGray
            }
            // textContentType={isPassword ? 'none' : 'emailAddress'}
            value={value}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChangeText={onChange}
            defaultValue={value}
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
            ref={inputRef}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={isSubmit ? "done" : "next"}
            blurOnSubmit
            autoCapitalize="characters"
            selection={selection}
            placeholder={inputPlaceholder}
            maxLength={maxLength}
          />
          {displayIcon()}
        </View>
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
    margin: 0,
    fontSize: fonts.sizeXL,
    color: colors.textBlack,
    // fontWeight: fonts.weight500,
    fontFamily: "sans-serif",
  },
  label: {
    color: colors.textGray,
  },
  disabledInput: {
    color: colors.textGray,
  },
});

export default MaskedInput;
