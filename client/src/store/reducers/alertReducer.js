import alertAcions from "../actions/alertActions";

const INITIAL_STATE = {
  showAlertMessage: false,
  alertMessageContent: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case alertAcions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
      };
    case alertAcions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };

    default:
      return state;
  }
};

export default reducer;
