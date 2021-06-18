import { SET_EV_LIST_DATA, SET_HUB_LIST_DATA } from "../actions/dropdowns";
const initialValues = {
  evList: [],
};
const dropdownsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case SET_EV_LIST_DATA: {
      return { ...state, evList: action.payload };
    }
    case SET_HUB_LIST_DATA: {
      return { ...state, hubList: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default dropdownsReducer;
