import React from "react";
import MaterialRipple from "react-native-material-ripple";

const Ripple = ({
  onPress,
  children,
  style,
  rippleContainerBorderRadius,
  disabled,
  rippleColor,
  rippleCentered,
}) => (
  <MaterialRipple
    onPress={onPress}
    style={style}
    rippleContainerBorderRadius={
      rippleContainerBorderRadius
        ? rippleContainerBorderRadius
        : rippleContainerBorderRadius === 0
        ? 0
        : 40
    }
    rippleCentered={rippleCentered}
    disabled={disabled}
    rippleColor={rippleColor}
  >
    {children}
  </MaterialRipple>
);

export default Ripple;
