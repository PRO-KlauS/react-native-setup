import React, { useState } from "react";
import { Icon } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input, Ripple } from "../index";
import { StyleSheet } from "react-native";
import { colors } from "../../styles";
import { formatDate, formatTime } from "../../utility";
import { constants } from "../../constants";
const DateTimePicker = ({
  mode,
  value,
  onChange,
  itemStyle,
  error,
  showError,
  viewStyle,
  inputStyle,
  onBlur,
  isRequired,
  disabled,
  minimumDate,
  maximumDate,
  placeholder,
  withOutItem,
  inputPlaceholder,
  iconStyle,
  rippleStyle,
}) => {
  const [show, setShow] = useState(false);
  const togglePicker = () => setShow(!show);
  const onValueChange = (date) => {
    togglePicker();
    onChange(date);
    onBlur && setTimeout(() => onBlur(), 1000);
  };

  let inputValue = mode === "date" ? formatDate(value) : formatTime(value);
  const { icons } = constants;
  return (
    <>
      <Ripple
        onPress={togglePicker}
        style={[styles.ripple, rippleStyle]}
        disabled={disabled}
        rippleContainerBorderRadius={0}
      >
        <Input
          disabled={disabled}
          viewStyle={viewStyle}
          inputStyle={inputStyle}
          itemStyle={itemStyle}
          placeholder={placeholder}
          isPassword={false}
          error={error}
          showError={showError}
          value={inputValue}
          isRequired={isRequired}
          withOutItem={withOutItem}
          inputPlaceholder={inputPlaceholder}
        />
        <Icon
          type={mode === "date" ? icons.calendar.type : icons.clock.type}
          name={mode === "date" ? icons.calendar.name : icons.clock.name}
          style={
            mode === "date"
              ? [styles.dateIcon, iconStyle]
              : [styles.timeIcon, iconStyle]
          }
        />
      </Ripple>
      {show && (
        <DateTimePickerModal
          mode={mode}
          value={value || new Date()}
          date={value || new Date()}
          onConfirm={onValueChange}
          onCancel={togglePicker}
          isVisible={show}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  ripple: {
    position: "relative",
  },
  dateIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 25,
    color: colors.iconGray,
  },
  timeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 25,
    color: colors.iconGray,
    fontSize: 18,
  },
});
export default DateTimePicker;
