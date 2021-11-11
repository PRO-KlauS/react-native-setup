import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
import rootReducer from "./rootReducer";
// import storage from 'redux-persist/es/storage'; // defaults to localStorage for web and AsyncStorage for react-native

const initialState = {};
const persistConfig = {
  key: "react_native_setup",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(persistedReducer, initialState, middleware);

const persistor = persistStore(store);

export default store;

export { persistor };
