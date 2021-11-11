// import { constants } from "../constants";
// import { readNotification } from "../api/notification";
// import { setNotificationCount as setNotiCount } from "../actions/notification";
// import { navigationMapper } from "../mappers";

// const {
//   planAssigned,
//   newCall,
//   newCourse,
//   newMessage,
//   paymentSuccessful,
//   sessionUpdated,
//   subscribedSuccessfully,
// } = constants.notificationTypes;

// const handleNotificationFromSystemTray = (notification, navigation, store) => {
//   const { data } = notification;
//   const { notification_id } = data;
//   let body = {
//     read: true,
//   };
//   // let customerID = store.getState().user.id;
//   switch (data.type) {
//     case planAssigned:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       setTimeout(() => {
//         navigation.navigate(navigationMapper[planAssigned], {
//           fromNotification: true,
//         });
//       }, 500);
//       break;
//     case newCall:
//     case sessionUpdated:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       setTimeout(() => {
//         navigation.navigate(navigationMapper[newCall], {
//           fromNotification: true,
//         });
//       }, 500);
//       break;
//     case newCourse:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       setTimeout(() => {
//         navigation.navigate(navigationMapper[newCourse], {
//           courseID: data?.course_id,
//         });
//       }, 500);
//       break;
//     case newMessage:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       setTimeout(() => {
//         navigation.navigate(navigationMapper[newMessage], {
//           coachID: data?.sender_id,
//           headerTitle: data?.sender_name,
//           coachImage: data?.sender_pic,
//         });
//       }, 500);
//       break;
//     case paymentSuccessful:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       setTimeout(() => {
//         navigation.navigate(navigationMapper[paymentSuccessful], {
//           fromNotification: true,
//         });
//       }, 500);
//       break;
//     case subscribedSuccessfully:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       setTimeout(() => {
//         navigation.navigate(navigationMapper[subscribedSuccessfully], {
//           fromNotification: true,
//         });
//       }, 500);
//       break;
//     default:
//       navigation.reset({
//         routes: [{ name: "notificationListing" }],
//       });
//       break;
//   }
//   readNotification(notification_id, body).then((res) => {
//     if (res.data.success === true) {
//       store.dispatch(setNotiCount());
//     }
//   });
// };

// const handleNotification = (notification, navigation, setNotificationCount) => {
//   const { data, notification_id } = notification;
//   let body = {
//     read: true,
//   };
//   switch (data.type) {
//     case planAssigned:
//       navigation.navigate(navigationMapper[planAssigned], {
//         fromNotification: true,
//       });
//       break;
//     case newCall:
//     case sessionUpdated:
//       navigation.navigate(navigationMapper[newCall], {
//         fromNotification: true,
//       });
//       break;
//     case newCourse:
//       navigation.navigate(navigationMapper[newCourse], {
//         courseID: data?.course_id,
//       });
//       break;
//     case newMessage:
//       navigation.navigate(navigationMapper[newMessage], {
//         coachID: data?.sender_id,
//         headerTitle: data?.sender_name,
//         coachImage: data?.sender_pic,
//       });
//       break;
//     case paymentSuccessful:
//       navigation.navigate(navigationMapper[paymentSuccessful], {
//         fromNotification: true,
//       });
//       break;
//     case subscribedSuccessfully:
//       navigation.navigate(navigationMapper[subscribedSuccessfully], {
//         fromNotification: true,
//       });
//       break;
//     // default:
//     //   navigation.reset({
//     //     routes: [{ name: "notificationListing" }],
//     //   });
//     //   break;
//   }
//   readNotification(notification_id, body).then((res) => {
//     if (res.data.success === true) {
//       setNotificationCount();
//     }
//   });
// };

// export {handleNotificationFromSystemTray, handleNotification}
