const serverStore = require("../../serverStore");

exports.updateRooms = (toSpecifiedSocketid = null) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();
  if (toSpecifiedSocketid) {
    io.to(toSpecifiedSocketid).emit("active-rooms", {
      activeRooms,
    });
  } else {
    io.emit("active-rooms", {
      activeRooms,
    });
  }
};
