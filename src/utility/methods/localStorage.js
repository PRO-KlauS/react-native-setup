import AsyncStorage from "@react-native-async-storage/async-storage";

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

export { getToken, saveToken, removeToken };
