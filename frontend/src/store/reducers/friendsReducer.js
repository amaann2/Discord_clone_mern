import { friendsActions } from "../actions/friendsAction";

const INITIAL_STATES = {
  friendsList: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const reducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case friendsActions.SET_PENDING_FRIENDS_INVITATION:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitation,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friendsList: action.friends,
      };

    case friendsActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };

    default:
      return state;
  }
};

export default reducer;
