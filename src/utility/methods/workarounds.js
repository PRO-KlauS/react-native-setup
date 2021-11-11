const enableFontPatch = () => {
  const React = require("react");
  const { Text } = require("react-native");
  const { Text: NativeBaseText } = require("native-base");

  const settings = [
    // we use this empty object for when there is no weight specified
    {},
    {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
    {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    {
      fontFamily: "sans-serif",
      fontWeight: "bold",
    },
    {
      fontFamily: "sans-serif-medium",
      fontWeight: "bold",
    },
  ];

  const defaultIndex = 0;

  const oldRender = Text.render;
  const NativeBaseOldRender = NativeBaseText.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);

    let useIndex = defaultIndex;

    let hasFontType =
      origin.props.style &&
      (origin.props.style.fontFamily || origin.props.type);

    if (!hasFontType) {
      hasFontType = Array.isArray(origin.props.style)
        ? origin.props.style.filter((o) => {
            return o && o.hasOwnProperty("fontFamily");
          }).length > 0
        : origin.props.style
        ? origin.props.style.fontFamily
        : false;
    }

    if (hasFontType) return React.cloneElement(origin);

    if (typeof origin.props.style !== "undefined") {
      const fontWeight = origin.props.style && origin.props.style.fontWeight;
      const fontWeightFromArray =
        origin.props.style[origin.props.style.length - 1] &&
        origin.props.style[origin.props.style.length - 1].fontWeight;

      if (
        fontWeight === "100" ||
        fontWeight === "200" ||
        fontWeight === "300" ||
        fontWeightFromArray === "100" ||
        fontWeightFromArray === "200" ||
        fontWeightFromArray === "300"
      ) {
        useIndex = 1;
      } else if (fontWeight === "500" || fontWeightFromArray === "500") {
        useIndex = 2;
      } else if (
        fontWeight === "500" ||
        fontWeight === "normal" ||
        fontWeightFromArray === "500" ||
        fontWeightFromArray === "normal"
      ) {
        useIndex = 3;
      } else if (fontWeight === "600" || fontWeightFromArray === "600") {
        useIndex = 4;
      } else if (
        fontWeight === "700" ||
        fontWeight === "bold" ||
        fontWeightFromArray === "700" ||
        fontWeightFromArray === "bold"
      ) {
        useIndex = 5;
      } else if (
        fontWeight === "800" ||
        fontWeight === "900" ||
        fontWeightFromArray === "800" ||
        fontWeightFromArray === "900"
      ) {
        useIndex = 6;
      }
    }

    const newStyle = Array.isArray(origin.props.style)
      ? [...origin.props.style]
      : [origin.props.style];
    if (!hasFontType) newStyle.push(settings[useIndex]);
    return React.cloneElement(origin, {
      style: newStyle,
    });
  };
  NativeBaseText.render = function (...args) {
    const origin = NativeBaseOldRender.call(this, ...args);

    let useIndex = defaultIndex;

    let hasFontType =
      origin.props.style &&
      (origin.props.style.fontFamily || origin.props.type);

    if (!hasFontType) {
      hasFontType = Array.isArray(origin.props.style)
        ? origin.props.style.filter((o) => {
            return o && o.hasOwnProperty("fontFamily");
          }).length > 0
        : origin.props.style
        ? origin.props.style.fontFamily
        : false;
    }

    if (hasFontType) return React.cloneElement(origin);

    if (typeof origin.props.style !== "undefined") {
      const fontWeight = origin.props.style && origin.props.style.fontWeight;
      const fontWeightFromArray =
        origin.props.style[origin.props.style.length - 1] &&
        origin.props.style[origin.props.style.length - 1].fontWeight;

      if (
        fontWeight === "100" ||
        fontWeight === "200" ||
        fontWeight === "300" ||
        fontWeightFromArray === "100" ||
        fontWeightFromArray === "200" ||
        fontWeightFromArray === "300"
      ) {
        useIndex = 1;
      } else if (fontWeight === "500" || fontWeightFromArray === "500") {
        useIndex = 2;
      } else if (
        fontWeight === "500" ||
        fontWeight === "normal" ||
        fontWeightFromArray === "500" ||
        fontWeightFromArray === "normal"
      ) {
        useIndex = 3;
      } else if (fontWeight === "600" || fontWeightFromArray === "600") {
        useIndex = 4;
      } else if (
        fontWeight === "700" ||
        fontWeight === "bold" ||
        fontWeightFromArray === "700" ||
        fontWeightFromArray === "bold"
      ) {
        useIndex = 5;
      } else if (
        fontWeight === "800" ||
        fontWeight === "900" ||
        fontWeightFromArray === "800" ||
        fontWeightFromArray === "900"
      ) {
        useIndex = 6;
      }
    }

    const newStyle = Array.isArray(origin.props.style)
      ? [...origin.props.style]
      : [origin.props.style];
    if (!hasFontType) newStyle.push(settings[useIndex]);
    return React.cloneElement(origin, {
      style: newStyle,
    });
  };
};

export { enableFontPatch };
