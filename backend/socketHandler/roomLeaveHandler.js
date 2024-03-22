const serverStore = require("../serverStore");
const { updateRooms } = require("./updates/rooms");
exports.roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = serverStore.getActiveRoom(roomId);
  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id);
    updateRooms();
  }
};
