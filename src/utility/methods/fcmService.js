// import messaging from "@react-native-firebase/messaging";
// import {Platform} from "react-native"

// let isIOS = Platform.OS === "ios";
// class FCMService {
//   register = (onRegister) => {
//     this.checkPermission(onRegister);
//     this.createNotificationListeners(onRegister);
//   };

//   checkPermission = (onRegister) => {
//     messaging()
//       .hasPermission()
//       .then((enabled) => {
//         if (enabled) {
//           //user has permission
//           this.getToken(onRegister);
//         } else {
//           //user don't have permission
//           this.requestPermission(onRegister);
//         }
//       })
//       .catch((error) => {
//         error;
//       });
//   };

//   getToken = (onRegister) => {
//     messaging()
//       .getToken()
//       .then((fcmToken) => {
//         if (fcmToken) {
//           onRegister(fcmToken);
//         }
//       })
//       .catch((error) => {
//         error;
//         // console.log('getToken rejected ', error);
//       });
//   };

//   requestPermission = (onRegister) => {
//     messaging()
//       .requestPermission()
//       .then(() => {
//         this.getToken(onRegister);
//       })
//       .catch((error) => {
//         error;
//         // console.log('Requested permission rejected ', error);
//       });
//   };

//   deleteToken = () => {
//     messaging()
//       .deleteToken()
//       .catch((error) => {
//         error;
//         //  console.log('Detect token error ', error);
//       });
//     isIOS && messaging().unregisterDeviceForRemoteMessages()
//   };

//   createNotificationListeners = (onRegister) => {
// isIOS && messaging().registerDeviceForRemoteMessages().then(() => {
//   messaging().getToken().then(token => onRegister(token))
// })
//     this.onTokenRefreshListener = messaging().onTokenRefresh((fcmToken) => {
//       onRegister(fcmToken);
//     });
//   };

//   unRegister = () => {
//     this.onTokenRefreshListener();
//   };
// }

// export const fcmService = new FCMService();
