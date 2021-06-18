import { getSupportContacts } from "../api/support";

const SET_SUPPORT_CONTACTS = "SET_SUPPORT_CONTACTS";

const setSupportContacts = (hubID) => (dispatch) => {
  return getSupportContacts(hubID).then((res) => {
    if (res.data.success === true) {
      dispatch({
        type: SET_SUPPORT_CONTACTS,
        payload: res.data.details,
      });
    }
    return res.data;
  });
};

export { setSupportContacts, SET_SUPPORT_CONTACTS };
