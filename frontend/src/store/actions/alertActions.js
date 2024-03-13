const alertAcions = {
  OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE",
  CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
};
export const getActions = (dispatch) => {
  return {
    openAlertMessage: (content) => dispatch(openAlertMessage(content)),
    closeAlertMessage: (content) => dispatch(closeAlertMessage()),
  };
};

export const openAlertMessage = (content) => {
  return {
    type: alertAcions.OPEN_ALERT_MESSAGE,
    content,
  };
};
export const closeAlertMessage = () => {
  return {
    type: alertAcions.CLOSE_ALERT_MESSAGE,
  };
};

export default alertAcions;
