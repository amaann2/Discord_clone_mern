const { getActiveRooms } = require("../serverStore");
const serverStore = require("../serverStore");
const { updateRooms } = require("./updates/rooms");
exports.roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);

  serverStore.joinActiveRoom(roomId, participantDetails);

  updateRooms();
};