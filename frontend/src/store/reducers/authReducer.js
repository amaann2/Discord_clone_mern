const INITIAL_STATE = {
  userDetails: null,
};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "Dummy":
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default authReducer;
