const serverStore = require("../../serverStore");
exports.updateRooms = (toSpecifiedTargetid = null) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();
  if (toSpecifiedTargetid) {
    io.to(toSpecifiedTargetid).emit("active-rooms", {
      activeRooms,
    });
  } else {
    io.emit("active-rooms", {
      activeRooms,
    });
  }
};
