import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Pagination } from "@crowdlinker/react-native-pager";
import { colors, spacing } from "../../styles";

const circleConfig = {
  transform: [
    {
      scale: {
        inputRange: [-2, -1, 0, 1, 2],
        outputRange: [0.5, 0.5, 0.8, 0.5, 0.5],
      },
    },
  ],
};

const Circle = (props) => {
  const { i, onPress, activeIndex } = props;
  return (
    <TouchableOpacity disabled={!onPress} onPress={() => onPress && onPress(i)}>
      <View
        style={[
          styles.circle,
          {
            backgroundColor:
              activeIndex === i ? colors.textPrimary : colors.textGray,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const PagerDotBar = ({
  onChange,
  activeIndex,
  length,
  parentViewStyle,
  paginationStyle,
}) => {
  const circleArray = new Array(length).fill(1);
  return (
    <View style={[styles.parentView, parentViewStyle]}>
      <Pagination
        // pageInterpolation={circleConfig}
        style={{ ...styles.pagination, ...paginationStyle }}
      >
        {circleArray.map((item, index) => (
          <Circle
            key={index}
            i={index}
            onPress={onChange}
            activeIndex={activeIndex}
          />
        ))}
      </Pagination>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    height: 40,
    marginTop: 10,
    width: 60,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
  },
});

export default PagerDotBar;
