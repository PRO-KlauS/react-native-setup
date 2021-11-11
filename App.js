import React, { useEffect, useState } from "react";
import { LogBox, StatusBar, Platform } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import VersionCheck from "react-native-version-check";
import RNBootSplash from "react-native-bootsplash";
import { Root } from "native-base";
import Drawer from "./src/setup/navigator";
import store, { persistor } from "./src/setup/store";
import { enableFontPatch } from "./src/utility";
// import PushNotification from "react-native-push-notification";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import { handleNotificationFromSystemTray } from "./src/utility";
// import { setNotificationCount } from "./src/actions/notification";
// import { Platform } from "react-native";
import { UpdateAppPopup } from "./src/components";
import { colors } from "./src/styles";

enableFontPatch();

const navigationDeferred = new Deferred();
const isIOS = Platform.OS === "ios";

// !isIOS && PushNotification.createChannel({
//   channelId: "Test_ID",
//   channelName: "Test Name",
//   channelDes: "Test Description",
//   soundName: "default",
//   importance: 4,
//   vibrate: true,
// });

// PushNotification.configure({
//   onNotification: (obj) => {
//     if (obj && obj.userInteraction) {
//       navigationDeferred.promise.then((navigation) => {
//         handleNotificationFromSystemTray(obj, navigation, store);
//       });
//     obj.finish(PushNotificationIOS.FetchResult.NoData);
//     } else {
//       PushNotification.localNotification({
//         smallIcon: "ic_launcher",
//         channelId: "Test_ID",
//         vibrate: true,
//         vibration: 500,
//         priority: "max",
//         visibility: "public",
//         ignoreInForeground: false,
//         invokeApp: true,
//         title: obj.data.title,
//         message: obj.data.body,
//         userInfo: { ...obj.data },
//       });
//       setTimeout(() => {
//         store.dispatch(setNotificationCount());
//       }, 2000);
//     }
//   },
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,
//   requestPermissions: true,
// });

const App = () => {
  const [updateNeeded, setUpdateNeeded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 100);
    LogBox.ignoreLogs(["Animated: `useNativeDriver`", "interpolate"]);
    LogBox.ignoreAllLogs();
  }, []);

  VersionCheck.needUpdate({
    provider: isIOS ? "appStore" : "playStore",
    country: "in",
  }).then(async (res) => {
    res && res.isNeeded && setUpdateNeeded(true);
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root>
          <StatusBar
            backgroundColor={colors.backGroundWhite}
            barStyle="light-content"
          />
          <NavigationContainer
            ref={(navigatorRef) => navigationDeferred.resolve(navigatorRef)}>
            <Drawer />
          </NavigationContainer>
          {updateNeeded && <UpdateAppPopup />}
        </Root>
      </PersistGate>
    </Provider>
  );
};

function Deferred() {
  this.promise = new Promise((resolve, reject) => {
    this.reject = reject;
    this.resolve = resolve;
  });
}

export default App;
