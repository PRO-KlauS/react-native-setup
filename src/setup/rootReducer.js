import { combineReducers } from "redux";
import loginReducer from "../reducers/login";
import profileReducer from "../reducers/profile";
import { LOGOUT } from "../actions/login";
import dropdownsReducer from "../reducers/dropdowns";
import languageReducer from "../reducers/internationalization";
import supportReducer from "../reducers/support";

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
