import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import { PermissionsAndroid, Platform } from "react-native";
import i18nInstance from "../../setup/i18next";
import { showToast } from "./other";
import { getFileExtensionFromName } from "./string";

const isIOS = Platform.OS === "ios";

const selectFile = async (acceptedFileTypes) => {
  try {
    const file = await DocumentPicker.pickSingle({
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

const openVideoPicker = async (callback) => {
  try {
    const file = await DocumentPicker.pickSingle({
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
    const file = await DocumentPicker.pickSingle({
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
    const file = await DocumentPicker.pickSingle({
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
    const file = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    });
    let isFileValid = false;
    const extension = getFileExtensionFromName(file?.name);
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
        const isFileValid = imageValidation(file);
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
        const extension = getFileExtensionFromName(file?.name);
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
        const extension = getFileExtensionFromName(file?.name);
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
    const file = await DocumentPicker.pickSingle({
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
    }
    return true;
  }
  showToast(i18nInstance.t("validationMessages.imageFormatValidation"));
  return false;
};

const videoValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (videoTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 50) {
      showToast(i18nInstance.t("validationMessages.videoSize50MB"));
      return false;
    }
    return true;
  }
  showToast(i18nInstance.t("validationMessages.videoFormatValidation"));
  return false;
};

const audioValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (audioTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 50) {
      showToast(i18nInstance.t("validationMessages.audioSize50MB"));
      return false;
    }
    return true;
  }
  showToast(i18nInstance.t("validationMessages.audioFormatValidation"));
  return false;
};

const documentValidation = (res) => {
  const { name, size } = res;
  const names = name.split(".");
  if (documentTypes.includes(names[names.length - 1].toLowerCase())) {
    if (bytesToMegaBytes(size) > 5) {
      showToast(i18nInstance.t("validationMessages.documentSize50MB"));
      return false;
    }
    return true;
  }
  showToast(i18nInstance.t("validationMessages.documentFormatValidation"));
  return false;
};

const downloadFileFromURL = async (
  url,
  name,
  successCallback,
  errorCallback,
) => {
  try {
    const granted = isIOS
      ? "granted"
      : await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "Please give storage access to download the file",
          },
        );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const dirs = RNFetchBlob.fs.dirs;
      const urlPartArray = url ? url.split("/") : [];
      const nameWithParams = urlPartArray[urlPartArray?.length - 1];
      const nameArray = nameWithParams ? nameWithParams.split("?") : [];
      const nameWithExtension = nameArray[0];

      showToast(i18nInstance.t("messages.downloadStarted"));

      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true,
          title: nameWithExtension,
          notification: true,
          description: "Downloading",
          mediaScannable: true,
          path: `${dirs.DownloadDir}/${name || nameWithExtension}`,
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
              `${dirs.DocumentDir}/${name || nameWithExtension}`,
              res.data,
              "base64",
            );
            RNFetchBlob.ios.previewDocument(
              `${dirs.DocumentDir}/${name || nameWithExtension}`,
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

export {
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
  imageTypes,
  videoTypes,
  audioTypes,
  documentTypes,
};
