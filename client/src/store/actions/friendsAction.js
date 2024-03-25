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

    acceptFriendInvitaion: (data) => dispatch(acceptFriendInvitaion(data)),
    rejectFriendInvitaion: (data) => dispatch(rejectFriendInvitaion(data)),
  };
};
export const setPendingFriendsInvitation = (pendingFriendsInvitation) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATION,
    pendingFriendsInvitation,
  };
};
export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};
export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

// invite a friends
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

// accept invitation of  a friend
const acceptFriendInvitaion = (data) => {
  return async (dispatch) => {
    const res = await api.acceptFriendInvitaion(data);
    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation accepted!"));
    }
  };
};

// reject invitation of friend
const rejectFriendInvitaion = (data) => {
  return async (dispatch) => {
    const res = await api.rejectFriendInvitaion(data);
    if (res.error) {
      dispatch(openAlertMessage(res?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation declined!"));
    }
  };
};
