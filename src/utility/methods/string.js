import { imageTypes, videoTypes } from "./file";

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const titleCase = (s) => {
  let sentence = s && s.split("_");
  sentence = sentence && sentence.map((se) => capitalize(se));

  return sentence && sentence.join(" ");
};

const getFileNameFromURL = (url) => {
  const tempName =
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
    const nameArray = name.split(".") || [];
    const extensionArray =
      (nameArray[nameArray.length - 1] &&
        nameArray[nameArray.length - 1].split("?")) ||
      [];
    return extensionArray[0] || "";
  }
  return "";
};

const getFileTypeFromName = (name) => {
  const extension = getFileExtensionFromName(name) || "";
  if (imageTypes.includes(extension.toLowerCase())) {
    return "image";
  }
  if (videoTypes.includes(extension.toLowerCase())) {
    return "video";
  }
  return "audio";
};

const removeAllSpacesFromString = (s) => s && s.replace(/ /g, "");

export {
  capitalize,
  getFileExtensionFromName,
  getFileNameFromURL,
  getFileTypeFromName,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
  titleCase,
};
