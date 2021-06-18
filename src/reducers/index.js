import { combineReducers } from "redux";
import loginReducer from "./login";
import profileReducer from "./profile";
import { LOGOUT } from "../actions/login";
import dropdownsReducer from "./dropdowns";
import languageReducer from "./internationalization";
import supportReducer from "./support";

const initialState = {
  user: {},
  profile: {},
  dropdowns: {
    evList: [],
    hubList: [],
  },
  language: "en",
  supportContacts: [],
};

const appReducer = combineReducers({
  user: loginReducer,
  profile: profileReducer,
  dropdowns: dropdownsReducer,
  language: languageReducer,
  supportContacts: supportReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOGOUT) {
    newState = { ...initialState };
  }
  return appReducer(newState, action);
};

export default rootReducer;
