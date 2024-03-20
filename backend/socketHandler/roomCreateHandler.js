const { addNewActiveRoom } = require("../serverStore");
const { updateRooms } = require("./updates/rooms");

exports.roomCreateHandler = async (socket) => {
  const socketId = socket.id;
  const userId = socket.user.userId;

  const roomDetails = addNewActiveRoom(userId, socketId);
  socket.emit("room-create", {
    roomDetails,
  });

  updateRooms();
};
