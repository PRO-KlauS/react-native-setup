import React from "react";
import FastImage from "react-native-fast-image";

const Image = ({ url, style, headers, priority, resizeMode, source }) => (
  <FastImage
    style={style}
    source={
      source || {
        uri: url,
        headers: headers,
        priority: priority || FastImage.priority.normal,
      }
    }
    resizeMode={resizeMode || FastImage.resizeMode.contain}
  />
);

export default Image;
