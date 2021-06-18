import { SET_SUPPORT_CONTACTS } from "../actions/support";

const supportReducer = (supportContacts = {}, action) => {
  switch (action.type) {
    case SET_SUPPORT_CONTACTS: {
      return action.payload;
    }
    default: {
      return supportContacts;
    }
  }
};

export default supportReducer;
