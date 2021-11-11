import {
  formatDate,
  formatDateBySpecifiedFormat,
  formatTime,
  fromNow,
  moment,
  timeTo,
} from "./methods/date";
import {
  selectFile,
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
  downloadFileFromURL,
} from "./methods/file";
import {
  convertProfileDataToFormData,
  convertRegistrationDataToFormData,
} from "./methods/formdata";
import { getToken, saveToken, removeToken } from "./methods/localStorage";
// import {handleNotificationFromSystemTray, handleNotification} from './methods/notification';
import { showToast, useStateCallback, getAPIBaseURL } from "./methods/other";
import {
  capitalize,
  getFileExtensionFromName,
  getFileNameFromURL,
  getFileTypeFromName,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
  titleCase,
} from "./methods/string";
import { enableFontPatch } from "./methods/workarounds";

export {
  formatDate,
  formatDateBySpecifiedFormat,
  formatTime,
  timeTo,
  fromNow,
  moment, // date
  selectFile,
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
  downloadFileFromURL, // file
  convertRegistrationDataToFormData,
  convertProfileDataToFormData, // formdata
  getToken,
  saveToken,
  removeToken, // localStorage
  // handleNotification,
  // handleNotificationFromSystemTray, // notification
  showToast,
  useStateCallback,
  getAPIBaseURL, // other
  capitalize,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
  titleCase,
  getFileNameFromURL,
  getFileTypeFromName,
  getFileExtensionFromName, // string
  enableFontPatch, // workaround
};
