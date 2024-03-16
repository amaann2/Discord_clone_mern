import { friendsActions } from "../actions/friendsAction";

const INITIAL_STATES = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const reducer = (state = INITIAL_STATES, action) => {
  switch (action.tye) {
    case friendsActions.SET_PENDING_FRIENDS:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitations,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
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
