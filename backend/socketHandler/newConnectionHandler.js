const { addNewConnectedUser } = require("../serverStore");
const {
  updateFriendsPendingInvitation,
  updateFriends,
} = require("./updates/friends");
const { updateRooms } = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitation list
  updateFriendsPendingInvitation(userDetails.userId);

  // update friends list
  updateFriends(userDetails.userId);

  // update active room list
  setTimeout(() => {
    updateRooms(socket.id);
  }, [500]);
};
module.exports = newConnectionHandler;
