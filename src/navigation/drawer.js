import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { ListItem, Icon, Badge } from "native-base";
import {
  Text,
  StyleSheet,
  View,
  Linking,
  // Platform
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useTranslation } from "react-i18next";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import VersionCheck from "react-native-version-check";

import { Ripple, Image } from "../components/index";
import { colors, spacing, fonts } from "../styles/index";
import { logout } from "../actions/login";
import { setProfileData } from "../actions/profile";
import { changeLanguageAction } from "../actions/internationalization";
import { setSupportContacts } from "../actions/support";
import { constants } from "../constants/index";
import i18nInstance from "../internationalization/intlSetup";
// import { setAppVersion, removeRegistrationToken } from "../api/profile";
// import { fcmService } from "../utility/FCMservice";

import Login from "../screens/login";
import ForgotPassword from "../screens/forgotPassword";
import Registration from "../screens/registration";
import MyProfile from "../screens/myProfile";
import OTP from "../screens/otp";
import ResetPassword from "../screens/resetPassword";
import InvoiceListing from "../screens/invoiceListing";
import InvoiceDetails from "../screens/invoiceDetails";
import { capitalize } from "../utility";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const { icons } = constants;

// let isIOS = Platform.OS === "ios"

const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="login"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="otp" component={OTP} />
    <Stack.Screen name="forgotPassword" component={ForgotPassword} />
    <Stack.Screen name="resetPassword" component={ResetPassword} />
    <Stack.Screen name="registration" component={Registration} />
  </Stack.Navigator>
);

const MyProfileStack = () => (
  <Stack.Navigator
    initialRouteName="myProfile"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="myProfile" component={MyProfile} />
  </Stack.Navigator>
);

const InvoiceListingStack = () => (
  <Stack.Navigator
    initialRouteName="invoiceListing"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="invoiceListing" component={InvoiceListing} />
    <Stack.Screen name="invoiceDetails" component={InvoiceDetails} />
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  const {
    logout,
    profile = {},
    drawerProps,
    // changeLanguage,
    // language,
    // setNotificationCount,
    // userId,
    supportContacts,
  } = props;
  // const [FCMToken, setFCMToken] = useState("");
  // const {navigation} = drawerProps;
  const { firstName, lastName, profilePhoto } = profile || {};

  const { t } = useTranslation();

  // const onChangeLanguage = (language) => {
  //   changeLanguage(language);
  //   i18n.changeLanguage(language);
  // };

  // const onRegister = async (token) => {
  //   let fcmToken = await AsyncStorage.getItem("FCM_TOKEN");
  //   registerToken({
  //     registration_token: token,
  //   });
  //   setFCMToken(token);
  //   if (fcmToken) {
  //     if (fcmToken !== token) {
  //       await AsyncStorage.setItem("FCM_TOKEN", token);
  //     }
  //   } else {
  //     await AsyncStorage.setItem("FCM_TOKEN", token);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      // setNotificationCount();
      // fcmService.register(onRegister);
    }, 1000);
    // let appVersion = VersionCheck.getCurrentVersion();
    // appVersion && setAppVersion(userId, { app_version: isIOS ? appVersion + "IOS" : appVersion });
  }, []);

  const onLogout = () => {
    // removeRegistrationToken({ registration_token: FCMToken })
    // .then(() => {
    // setFCMToken("");
    logout();
    // })
    // .catch(() => {
    //   setFCMToken("");
    //   logout();
    // });
  };

  const dialCall = (phoneNo) => {
    const number = `tel:${phoneNo}`;
    Linking.openURL(number);
  };

  return (
    <DrawerContentScrollView {...drawerProps} style={styles.drawerContainer}>
      <ListItem style={styles.listItem}>
        <View style={styles.userInfoContainerView}>
          <View style={styles.userAvatar}>
            {profilePhoto ? (
              <Image style={styles.image} url={profilePhoto} />
            ) : firstName ? (
              <UserAvatar
                size={120}
                name={`${capitalize(firstName)} ${capitalize(lastName)}`}
                bgColor={colors.backgroundLightGray}
                textColor={colors.textSecondary}
              />
            ) : (
              <Image style={styles.image} url={profilePhoto} />
            )}
            {/* <View style={styles.flagRow}>
              <Ripple
                disabled={language === "en"}
                onPress={() => onChangeLanguage("en")}
                style={[
                  { marginBottom: 10 },
                  language === "en" && {
                    borderBottomColor: colors.borderBlack,
                    borderBottomWidth: 2,
                  },
                ]}>
                <FlagIcon
                  name="united-states-of-america"
                  width={40}
                  height={40}
                />
              </Ripple>
              <Ripple
                disabled={language === "hi"}
                onPress={() => onChangeLanguage("hi")}
                style={
                  language === "hi" && {
                    borderBottomColor: colors.borderBlack,
                    borderBottomWidth: 2,
                  }
                }>
                <FlagIcon name="japan" width={40} height={40} />
              </Ripple>
            </View> */}
          </View>
          <View>
            <Text style={styles.userName}>
              {firstName ? `${firstName} ${lastName}` : ""}
            </Text>
          </View>
        </View>
      </ListItem>
      <DrawerItemList
        {...drawerProps}
        activeBackgroundColor={colors.backGroundLightBlue}
      />
      <Ripple onPress={onLogout}>
        <View style={[styles.parentView]}>
          <Icon
            name={icons.logout.name}
            type={icons.logout.type}
            style={styles.iconStyle}
          />
          <Text style={styles.navigationText}>
            {t("drawer.logoutPlaceholder")}
          </Text>
        </View>
      </Ripple>
      {supportContacts?.length > 0 ? (
        <View style={{ paddingBottom: 20 }}>
          <View
            style={[
              styles.parentView,
              {
                marginTop: 5,
                marginLeft: -1,
              },
            ]}>
            <Icon
              name={icons.support.name}
              type={icons.support.type}
              style={styles.iconStyle}
            />
            <Text style={styles.navigationText}>
              {t("drawer.helplineNoPlaceholder")}
            </Text>
          </View>
          {supportContacts.map(({ contactNo } = {}) => {
            return contactNo ? (
              <View style={[styles.parentView]}>
                <Text
                  style={[styles.supportNumber]}
                  onPress={() => dialCall(contactNo)}>
                  {contactNo}
                </Text>
              </View>
            ) : null;
          })}
        </View>
      ) : null}
    </DrawerContentScrollView>
  );
};

const createDrawerItem = (
  name,
  title,
  icon,
  component,
  iconType,
  iconStyle,
  textStyle,
  badgeCount,
  hasBellIcon,
) => {
  return (
    <Drawer.Screen
      edgeWidth={0}
      name={name}
      component={component}
      options={{
        drawerLabel: ({ focused }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text
              style={[
                {
                  color: focused ? colors.textPrimary : colors.textBlack,
                  width: "100%",
                },
                textStyle,
              ]}>
              {title}
            </Text>
            {name === "notificationListing" && badgeCount > 0 ? (
              <Badge style={styles.badgeParentView}>
                <Text style={styles.badgeCount}>{badgeCount}</Text>
              </Badge>
            ) : null}
            {hasBellIcon ? (
              <Icon
                type={icons.bell.type}
                name={icons.bell.name}
                style={styles.bellIcon}
              />
            ) : null}
          </View>
        ),
        drawerIcon: ({ focused }) => (
          <Icon
            type={iconType}
            name={icon}
            style={[
              {
                color: focused ? colors.iconPrimary : colors.iconGray,
                fontSize: 18,
              },
              iconStyle,
            ]}
          />
        ),
      }}
    />
  );
};

const CustomDrawer = (props) => {
  const [isInitialRender, setInitialRender] = useState(true);
  const { t } = useTranslation();
  const {
    logout,
    profile = {},
    userId,
    setNotificationCount,
    notificationCount,
    setProfileData,
    changeLanguage,
    language,
    supportContacts,
    setSupportContacts,
  } = props;

  useEffect(() => {
    setTimeout(() => setInitialRender(false), 1);
    setProfileData();
  }, []);

  useEffect(() => {
    profile?.hubId && setSupportContacts(profile?.hubId);
  }, [profile?.hubId]);

  return (
    <Drawer.Navigator
      edgeWidth={0}
      openByDefault={false}
      drawerStyle={{
        width: isInitialRender ? 0 : 280,
      }}
      screenOptions={{ unmountOnBlur: true }}
      drawerContent={(drawerProps) => (
        <CustomDrawerContent
          drawerProps={drawerProps}
          logout={logout}
          profile={profile}
          userId={userId}
          setNotificationCount={setNotificationCount}
          notificationCount={notificationCount}
          setProfileData={setProfileData}
          changeLanguage={changeLanguage}
          language={language}
          supportContacts={supportContacts}
        />
      )}
      initialRouteName="myProfile">
      {createDrawerItem(
        "myProfile",
        t("drawer.myProfilePlaceholder"),
        icons.profile.name,
        MyProfileStack,
        icons.profile.type,
        styles.drawerIconStyle,
        { ...styles.drawerTextStyle, marginLeft: 3 },
      )}
      {createDrawerItem(
        "invoiceListing",
        t("drawer.invoiceHistoryPlaceholder"),
        icons.invoice.name,
        InvoiceListingStack,
        icons.invoice.type,
        { ...styles.drawerIconStyle, fontSize: 16, marginLeft: 5 },
        { ...styles.drawerTextStyle, marginLeft: 2 },
      )}
    </Drawer.Navigator>
  );
};

const Navigator = (props) => {
  const { token, language } = props;
  useEffect(() => {
    i18nInstance.changeLanguage(language || "en");
  }, []);

  return token ? <CustomDrawer {...props} /> : <LoginStack {...props} />;
};

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    marginTop: -5,
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  userInfoContainerView: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  drawerContainer: {
    backgroundColor: colors.backGroundWhite,
  },
  userAvatar: {
    marginBottom: 20,
    width: 240,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flagRow: {
    // position: "absolute",
    // right: 0,
    // top: 0,
  },
  userFirstLetter: {
    color: colors.textBlack,
    fontSize: 25,
  },
  userName: {
    fontSize: fonts.sizeXXXL,
    color: colors.textWhite,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  navigationText: {
    fontSize: fonts.sizeMD,
    color: colors.textBlack,
    lineHeight: 22,
    paddingLeft: spacing.md,
  },
  iconStyle: {
    fontSize: fonts.sizeXXL,
    color: colors.iconGray,
    width: 30,
  },
  parentView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  drawerIconStyle: {
    marginLeft: 2,
  },
  drawerTextStyle: {
    marginLeft: 2,
  },
  notificationIcon: {
    marginLeft: 3,
  },
  notificationText: {
    marginLeft: 3,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 120,
    backgroundColor: colors.backgroundLightGray,
  },
  badgeParentView: {
    backgroundColor: colors.backgroundSecondary,
    height: 20,
    position: "absolute",
    right: -10,
    borderRadius: 30,
  },
  bellIcon: {
    top: 1,
    color: colors.backgroundSecondary,
    height: 20,
    position: "absolute",
    right: -10,
    fontSize: 18,
  },
  badgeCount: {
    color: colors.textBlack,
    justifyContent: "center",
  },
  supportNumber: {
    textDecorationLine: "underline",
    color: colors.textPrimary,
    marginLeft: 48,
    marginTop: 0,
    // marginTop: 10,
    marginBottom: 0,
  },
});

const mapStateToProps = (state) => ({
  token: state.user.token,
  profile: state.profile,
  userId: state.user.id,
  notificationCount: state.notification,
  language: state.language,
  supportContacts: state.supportContacts,
});
const mapDispatchToProps = {
  logout,
  setProfileData,
  // setNotificationCount,
  changeLanguage: changeLanguageAction,
  setSupportContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
