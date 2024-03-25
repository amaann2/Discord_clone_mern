import io from "socket.io-client";
import {
  setPendingFriendsInvitation,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsAction";
import store from "../store/store";
import updateDirectChatHistoryIfActive from "../shared/utils/chat";
import { newRoomCreated, updateActiveRooms } from "./roomHandler";
import { handleSignalingData, prepareNewPeerConnection } from "./webRTCHandler";

let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails?.token;
  // socket = io("http://localhost:5002", {
  socket = io("https://videochatapp-b5bx.onrender.com", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log(`successfully connected with socket.io server : ${socket.id}`);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitation(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });
  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    newRoomCreated(data);
  });
  socket.on("active-rooms", (data) => {
    updateActiveRooms(data);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const createNewwRoom = () => {
  socket.emit("room-create");
};

export const joinRoomm = (data) => {
  socket.emit("room-join", data);
};

export const leaveRoomm = (data) => {
  socket.emit("room-leave", data);
};
export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
