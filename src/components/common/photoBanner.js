import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "native-base";
import UserAvatar from "react-native-user-avatar";
import { Ripple, Image } from "../index";
import { colors } from "../../styles";

const PhotoBanner = ({
  imageURL,
  name,
  rippleStyle,
  parentStyle,
  avatarSize,
  avatarStyle,
  onClick,
  rippleRadius,
  hasImage,
  imageStyle,
}) => (
  <View style={[styles.parentStyle, parentStyle]}>
    <Ripple
      disabled={!onClick}
      onPress={onClick}
      rippleContainerBorderRadius={rippleRadius || 100}
      style={[styles.rippleStyle, rippleStyle]}
    >
      {!hasImage && name ? (
        <UserAvatar
          size={avatarSize || 80}
          name={name && name[0]}
          src={imageURL}
          style={[styles.userAvatar, avatarStyle]}
        />
      ) : (
        <Image style={[styles.image, imageStyle]} url={imageURL} />
      )}
      {onClick ? (
        <Icon style={styles.editIcon} name="pencil" type="FontAwesome" />
      ) : null}
    </Ripple>
  </View>
);

const styles = StyleSheet.create({
  parentStyle: {
    backgroundColor: colors.backgroundSecondary,
    height: 50,
    position: "relative",
    marginBottom: 60,
    justifyContent: "center",
  },
  rippleStyle: {
    position: "absolute",
    left: "50%",
    top: "50%",
    justifyContent: "center",
    marginTop: -20,
    marginLeft: -47,
    borderRadius: 50,
    // height: 50,
    // width: 50,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: colors.backgroundLightGray,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -5,
    fontSize: 16,
    color: colors.iconWhite,
    backgroundColor: colors.backgroundSecondary,
    width: 30,
    height: 30,
    borderRadius: 30,
    textAlign: "center",
    lineHeight: 30,
  },
});

export default PhotoBanner;
