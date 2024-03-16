import io from "socket.io-client";
import { setPendingFriendsInvitation } from "../store/actions/friendsAction";
import store from "../store/store";
let socket = null;
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails?.token;
  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log(`successfully connected with socket.io server : ${socket.id}`);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitaions } = data;
    console.log("friends invitaions event came");
    console.log(data);
    store.dispatch(setPendingFriendsInvitation(pendingInvitaions));
  });
};
