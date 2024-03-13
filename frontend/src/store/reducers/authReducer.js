import { authAction } from "../actions/authActions";

const INITIAL_STATE = {
  userDetails: null,
  
};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authAction.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };

    default:
      return state;
  }
};
export default authReducer;
