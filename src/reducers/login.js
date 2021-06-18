import { SET_USER_DATA } from '../actions/login';

const loginReducer = (user = {}, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return action.payload;
    }
    default: {
      return user;
    }
  }
};

export default loginReducer;
