import { openAlertMessage } from "./alertActions";
import * as api from "../../api";
export const friendsActions = {
  SET_FRIENDS: "SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATION: "SET_PENDING_FRIENDS_INVITATION",
  SET_ONLINE_USERS: "SET_ONLINE_USERS",
};
export const getActions = (dispatch) => {
  return {
    sendFriendsInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendsInvitation(data, closeDialogHandler)),
  };
};
export const setPendingFriendsInvitation = (pendingFriendsInvitation) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS.INVITATION,
    pendingFriendsInvitation,
  };
};
const sendFriendsInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const res = await api.sendFriendsInvitation(data);

    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation has been sent!"));
      closeDialogHandler();
    }
  };
};
