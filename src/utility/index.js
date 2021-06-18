import { useState, useRef, useEffect } from "react";
import { Toast } from "native-base";
import { PermissionsAndroid, Platform } from "react-native";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
// import { constants } from "../constants";
// import { readNotification } from "../api/notification";
// import { setNotificationCount as setNotiCount } from "../actions/notification";
// import { navigationMapper } from "./mappers";
import i18nInstance from "../internationalization/intlSetup";
import { colors } from "../styles";
// import { launchImageLibrary } from "react-native-image-picker";

const isIOS = Platform.OS === "ios";

const showToast = (
  text,
  style,
  duration,
  buttonText,
  type,
  textStyle,
  buttonTextStyle,
  buttonStyle
) => {
  text &&
    Toast.show({
      text: text,
      buttonText: buttonText,
      type: type,
      textStyle: textStyle,
      buttonTextStyle: buttonTextStyle,
      buttonStyle: buttonStyle,
      position: "bottom",
      duration: duration || 3000,
      style: [
        {
          backgroundColor: colors.backgroundDarkGray,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 8,
        },
        style,
      ],
    });
};

// moment.tz.setDefault("Asia/Tokyo");

const formatDate = (date) => date && moment(date).format("DD/MM/YYYY");

const formatDateBySpecifiedFormat = (date, format) =>
  date && format && moment(date).format(format);

const formatTime = (time) => time && moment(time).format("hh:mm A");

const fromNow = (date) => moment(date).fromNow();

const timeTo = (date) => {
  let returnValue = "-";
  if (date) {
    let today = moment();
    let checkingDate = moment(date);
    let diff = moment.duration(checkingDate.diff(today));

    let hoursDiff = parseInt(diff.asHours());

    let minutesDiff = parseInt(diff.asMinutes()) % 60;

    if (hoursDiff > 24) {
      returnValue = capitalize(moment(date).toNow(true));
    } else {
      returnValue = `${hoursDiff} ${
        hoursDiff > 1 ? "hours" : "hour"
      } ${minutesDiff} ${minutesDiff > 1 ? "minutes" : "minute"}`;
    }
  }
  return returnValue;
};

const getFileInfo = ({ name, uri, type }) => ({ name, uri, type });

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const titleCase = (s) => {
  let sentence = s && s.split("_");
  sentence = sentence && sentence.map((se) => capitalize(se));

  return sentence && sentence.join(" ");
};

const getFileNameFromURL = (url) => {
  let tempName =
    (url && url.split("/").pop().split("#")[0].split("?")[0]) || "";
  return tempName.replace(/%20/g, " ");
};

const getStringWithDays = (s) => {
  let modifiedString = s || "-";
  if (modifiedString > 1) {
    modifiedString += " days";
  } else if (modifiedString == 1) {
    modifiedString += " day";
  }
  return modifiedString;
};

const getStringWithHours = (s) => {
  let modifiedString = s || "-";
  if (modifiedString > 1) {
    modifiedString += " hours";
  } else if (modifiedString == 1) {
    modifiedString += " hour";
  }
  return modifiedString;
};

const getFileExtensionFromName = (name) => {
  if (name) {
    let nameArray = name.split(".") || [];
    let extensionArray =
      (nameArray[nameArray.length - 1] &&
        nameArray[nameArray.length - 1].split("?")) ||
      [];
    return extensionArray[0] || "";
  }
};

const getFileTypeFromName = (name) => {
  let extension = getFileExtensionFromName(name) || "";
  if (imageTypes.includes(extension.toLowerCase())) {
    return "image";
  } else if (videoTypes.includes(extension.toLowerCase())) {
    return "video";
  } else {
    return "audio";
  }
};

const removeAllSpacesFromString = (s) => s && s.replace(/ /g, "");

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    if (token !== null) {
      return token;
    }
  } catch (e) {
    return e;
  }
};

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("TOKEN", token);
  } catch (e) {
    return e;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("TOKEN");
    await AsyncStorage.removeItem("FCM_TOKEN");
  } catch (e) {
    return e;
  }
};

const selectFile = async (acceptedFileTypes) => {
  try {
    const file = await DocumentPicker.pick({
      type: acceptedFileTypes,
    });
    return file;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
  return {
    path: "",
    name: "",
  };
};

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

    let newStyle = Array.isArray(origin.props.style)
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

    let newStyle = Array.isArray(origin.props.style)
      ? [...origin.props.style]
      : [origin.props.style];
    if (!hasFontType) newStyle.push(settings[useIndex]);
    return React.cloneElement(origin, {
      style: newStyle,
    });
  };
};

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = (state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

const openVideoPicker = async (callback) => {
  try {
    const file = await DocumentPicker.pick({
      type: videoTypes,
    });
    if (videoValidation(file)) {
      callback && callback(file);
    }
  } catch (err) {
    return err;
  }
};

const openImagePicker = async (callback) => {
  try {
    const file = await DocumentPicker.pick({
      // type: imageTypes,
      type: DocumentPicker.types.images,
    });
    if (imageValidation(file)) {
      callback && callback(file);
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      return err;
    }
  }
  return {
    path: "",
    name: "",
  };
};
const openDocumentPicker = async (callback) => {
  try {
    const file = await DocumentPicker.pick({
      type: DocumentPicker.types.pdf,
    });
    if (documentValidation(file)) {
      callback && callback(file);
    }
  } catch (err) {
    return err;
  }
};

const openImageAndDocumentPicker = async (callback) => {
  try {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    });
    let isFileValid = false;
    let extension = getFileExtensionFromName(file?.name);
    if (imageTypes.includes(extension.toLowerCase())) {
      isFileValid = imageValidation(file);
    } else if (documentTypes.includes(extension.toLowerCase())) {
      isFileValid = documentValidation(file);
    } else {
      showToast(i18nInstance.t("validationMessages.onlyImageOrPdf"));
    }
    if (isFileValid) {
      callback && callback(file);
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      return err;
    }
  }
};

const openImagePickerWithMultiple = async (callback) => {
  try {
    const files = await DocumentPicker.pickMultiple({
      type: DocumentPicker.types.images,
    });
    if (files?.length > 5) {
      showToast(i18nInstance.t("validationMessages.max5Images"));
    } else {
      let isValid = false;
      for (const file of files) {
        let isFileValid = imageValidation(file);
        if (!isFileValid) {
          isValid = false;
          break;
        } else {
          isValid = true;
        }
      }
      if (isValid) {
        callback && callback(files);
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      return err;
    }
  }
  return [];
};

const openMediaPickerWithMultiple = async (callback) => {
  try {
    const files = await DocumentPicker.pickMultiple({
      type: [
        DocumentPicker.types.images,
        ...videoTypes,
        DocumentPicker.types.audio,
      ],
    });
    if (files?.length > 5) {
      showToast(i18nInstance.t("validationMessages.max5media"));
    } else {
      let isValid = false;
      for (const file of files) {
        let isFileValid = false;
        let extension = getFileExtensionFromName(file?.name);
        if (imageTypes.includes(extension.toLowerCase())) {
          isFileValid = imageValidation(file);
        } else if (videoTypes.includes(extension.toLowerCase())) {
          isFileValid = videoValidation(file);
        } else if (audioTypes.includes(extension.toLowerCase())) {
          isFileValid = audioValidation(file);
        } else {
          showToast(i18nInstance.t("validationMessages.onlyMediaFiles"));
        }
        if (!isFileValid) {
          isValid = false;
          break;
        } else {
          isValid = true;
        }
      }
      if (isValid) {
        callback && callback(files);
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      return err;
    }
  }
  return [];
};

const openMediaAndDocumentPickerWithMultiple = async (callback) => {
  try {
    const files = await DocumentPicker.pickMultiple({
      type: [
        DocumentPicker.types.images,
        ...videoTypes,
        DocumentPicker.types.audio,
        DocumentPicker.types.pdf,
      ],
    });
    if (files?.length > 5) {
      showToast(i18nInstance.t("validationMessages.max5MediaOrPdf"));
    } else {
      let isValid = false;
      for (const file of files) {
        let isFileValid = false;
        let extension = getFileExtensionFromName(file?.name);
        if (imageTypes.includes(extension.toLowerCase())) {
          isFileValid = imageValidation(file);
        } else if (videoTypes.includes(extension.toLowerCase())) {
          isFileValid = videoValidation(file);
        } else if (audioTypes.includes(extension.toLowerCase())) {
          isFileValid = audioValidation(file);
        } else if (documentTypes.includes(extension.toLowerCase())) {
          isFileValid = documentValidation(file);
        } else {
          showToast(i18nInstance.t("validationMessages.onlyMediaOrPdf"));
        }
        if (!isFileValid) {
          isValid = false;
          break;
        } else {
          isValid = true;
        }
      }
      if (isValid) {
        callback && callback(files);
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      return err;
    }
  }
  return [];
};

const openAudioPicker = async (callback) => {
  try {
    const file = await DocumentPicker.pick({
      type: DocumentPicker.types.audio,
    });
    if (audioValidation(file)) {
      callback && callback(file);
    }
  } catch (err) {
    return err;
  }
};

const imageTypes = ["jpeg", "jpg", "png", ".jpeg", ".jpg", ".png"];

const videoTypes = ["mp4", "mov", "wmv", "mkv", ".mp4", ".mov", ".wmv", ".mkv"];

const audioTypes = ["m4a", "mp3", "wma", "aac", ".m4a", ".mp3", ".wma", ".aac"];

const documentTypes = ["pdf", ".pdf"];

const bytesToMegaBytes = (bytes) => bytes / (1024 * 1024);

const imageValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (imageTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 5) {
      showToast(i18nInstance.t("validationMessages.imageSize5MB"));
      return false;
    } else {
      return true;
    }
  } else {
    showToast(i18nInstance.t("validationMessages.imageFormatValidation"));
    return false;
  }
};

const videoValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (videoTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 50) {
      showToast(i18nInstance.t("validationMessages.videoSize50MB"));
      return false;
    } else {
      return true;
    }
  } else {
    showToast(i18nInstance.t("validationMessages.videoFormatValidation"));
    return false;
  }
};

const audioValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (audioTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 50) {
      showToast(i18nInstance.t("validationMessages.audioSize50MB"));
      return false;
    } else {
      return true;
    }
  } else {
    showToast(i18nInstance.t("validationMessages.audioFormatValidation"));
    return false;
  }
};

const documentValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (documentTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 5) {
      showToast(i18nInstance.t("validationMessages.documentSize50MB"));
      return false;
    } else {
      return true;
    }
  } else {
    showToast(i18nInstance.t("validationMessages.documentFormatValidation"));
    return false;
  }
};

const downloadFileFromURL = async (
  url,
  name,
  successCallback,
  errorCallback
) => {
  try {
    const granted = isIOS
      ? "granted"
      : await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "Please give storage access to download the file",
          }
        );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let dirs = RNFetchBlob.fs.dirs;
      let urlPartArray = url ? url.split("/") : [];
      let nameWithParams = urlPartArray[urlPartArray?.length - 1];
      let nameArray = nameWithParams ? nameWithParams.split("?") : [];
      let nameWithExtension = nameArray[0];

      showToast(i18nInstance.t("messages.downloadStarted"));

      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          title: nameWithExtension,
          notification: true,
          description: "Downloading",
          mediaScannable: true,
          path: dirs.DownloadDir + "/" + (name || nameWithExtension),
        },
        // title: nameWithExtension,
        // path: (isIOS ? dirs.DocumentDir : dirs.DownloadDir) + "/" + (name || nameWithExtension),
        fileCache: true,
        appendExt: "pdf",
      })
        .fetch("GET", url)
        .then((res) => {
          if (isIOS) {
            RNFetchBlob.fs.writeFile(
              dirs.DocumentDir + "/" + (name || nameWithExtension),
              res.data,
              "base64"
            );
            RNFetchBlob.ios.previewDocument(
              dirs.DocumentDir + "/" + (name || nameWithExtension)
            );
          } else {
            RNFetchBlob.fs.scanFile([{ path: res.path() }]);
          }
          showToast(i18nInstance.t("messages.fileDownloaded"));
          successCallback && successCallback(res);
        })
        .catch(() => {
          showToast(i18nInstance.t("messages.tryAgain"));
          errorCallback && errorCallback();
        });
    } else {
      showToast(i18nInstance.t("messages.giveStorageAccess"));
      errorCallback && errorCallback();
    }
  } catch (err) {
    showToast(i18nInstance.t("messages.tryAgain"));
    errorCallback && errorCallback();
  }
};

const convertRegistrationDataToFormData = (obj) => {
  let formData = new FormData();

  // First form data
  formData.append("FirstName", obj.firstName);
  formData.append("LastName", obj.lastName);
  formData.append("IsActive", 2);
  obj.dob && formData.append("DOB", new Date(obj.dob).toDateString());
  formData.append("ContactNo", obj.mobileNumber);
  obj.secondaryMobileNo &&
    formData.append("AltContactNo", obj.secondaryMobileNo);
  formData.append("Password", obj.password);
  obj.profileImageObj &&
    obj.profileImageObj.uri &&
    !(obj.profileImageObj.uri && !obj.profileImageObj.name) &&
    formData.append("ProfilePhoto", obj.profileImageObj);

  // Second form data
  formData.append(
    `${
      obj.documentType === "aadhar"
        ? "AadharCardNo"
        : obj.documentType === "driving_license"
        ? "DrivingLicenseNo"
        : "PanNo"
    }`,
    removeAllSpacesFromString(obj.documentNo)
  );
  obj.documentObj &&
    obj.documentObj.uri &&
    !(obj.documentObj.uri && !obj.documentObj.name) &&
    formData.append(
      // Change key names
      `documents.${
        obj.documentType === "aadhar"
          ? "AadharCopy"
          : obj.documentType === "driving_license"
          ? "DrivingLicenseCopy"
          : "PanCopy"
      }`,
      obj.documentObj
    );

  formData.append("HubId", obj.hubID);
  obj.address && formData.append("Address", obj.address);
  obj.pincode && formData.append("Pincode", obj.pincode);

  // Third Form Data
  obj.bankName && formData.append("BankAccountName", obj.bankName);
  obj.ifscCode && formData.append("IFSCCode", obj.ifscCode);
  obj.accountNo && formData.append("BankAccountNo", obj.accountNo);
  // obj.branchAddress &&
  //   formData.append("driver[achieve_goal_by_platform]", obj.branchAddress);
  // obj.branchPincode &&
  //   formData.append("driver[personal_trainer]", obj.branchPincode);
  obj.vehicleRegNo &&
    formData.append(
      "electricVehicle[VehicleNo]",
      removeAllSpacesFromString(obj.vehicleRegNo)
    );
  obj.insurancePolicyNo &&
    formData.append(
      "electricVehicle[InsurancePolicyNo]",
      obj.insurancePolicyNo
    );

  // Fourth Form Data
  obj.retroKitName &&
    formData.append("electricVehicle[RetrofitKitName]", obj.retroKitName);
  obj.retroKitNumber &&
    formData.append("electricVehicle[RetrofitKitNo]", obj.retroKitNumber);
  formData.append("electricVehicle[ChassisNumber]", obj.chassisNumber);
  obj.dcMakerName &&
    formData.append("electricVehicle[DCConvertorMakerName]", obj.dcMakerName);
  obj.dcMakerNumber &&
    formData.append(
      "electricVehicle[DCConvertorMakerNumber]",
      obj.dcMakerNumber
    );
  obj.driveMakerName &&
    formData.append("electricVehicle[DriveMotorMake]", obj.driveMakerName);
  obj.driveMakerModel &&
    formData.append("electricVehicle[DriveMotorModel]", obj.driveMakerModel);
  return formData;
};

const convertProfileDataToFormData = (obj) => {
  let formData = new FormData();

  // First form data
  formData.append("driver[firstName]", obj.firstName);
  formData.append("driver[lastName]", obj.lastName);
  obj.dob && formData.append("driver[dob]", new Date(obj.dob).toDateString());
  obj.secondaryMobileNo &&
    formData.append("driver[altContactNo]", obj.secondaryMobileNo);
  obj.profileImageObj &&
    obj.profileImageObj.uri &&
    !(obj.profileImageObj.uri && !obj.profileImageObj.name) &&
    formData.append("driver[profilePhoto]", obj.profileImageObj);

  // Second form data
  obj.address && formData.append("driver[address]", obj.address);
  obj.pincode && formData.append("driver[pincode]", obj.pincode);

  // obj.bankName && formData.append("driver[bankAccountName]", obj.bankName);
  // obj.ifscCode && formData.append("driver[ifscCode]", obj.ifscCode);
  // obj.accountNo && formData.append("driver[bankAccountNo]", obj.accountNo);
};

export {
  showToast,
  formatDate,
  formatTime,
  timeTo,
  fromNow,
  getToken,
  saveToken,
  removeToken,
  selectFile,
  getFileInfo,
  capitalize,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
  // handleNotification,
  // handleNotificationFromSystemTray,
  enableFontPatch,
  useStateCallback,
  openImagePicker,
  openImagePickerWithMultiple,
  openVideoPicker,
  openAudioPicker,
  openDocumentPicker,
  openImageAndDocumentPicker,
  openMediaPickerWithMultiple,
  openMediaAndDocumentPickerWithMultiple,
  imageValidation,
  videoValidation,
  formatDateBySpecifiedFormat,
  convertRegistrationDataToFormData,
  convertProfileDataToFormData,
  titleCase,
  getFileNameFromURL,
  getFileTypeFromName,
  moment,
  downloadFileFromURL,
};
