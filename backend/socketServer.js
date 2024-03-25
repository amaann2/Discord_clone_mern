const authSocket = require("./middleware/authSocket");
const serverStore = require("./serverStore");
const {
  directChatHistory,
} = require("./socketHandler/directChatHistoryHandler");
const {
  directMessangeHandler,
} = require("./socketHandler/directMessageHandler");
const { disconnectHandler } = require("./socketHandler/disconnectHandler");
const newConnectionHandler = require("./socketHandler/newConnectionHandler");
const { roomCreateHandler } = require("./socketHandler/roomCreateHandler");
const {
  roomInitConnectionHandler,
} = require("./socketHandler/roomInitConnectionHandler");
const { roomJoinHandler } = require("./socketHandler/roomJoinHandler");
const { roomLeaveHandler } = require("./socketHandler/roomLeaveHandler");
const {
  roomSingalingDataHandler,
} = require("./socketHandler/roomSingalingDataHandler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("user connected : ", socket.id);
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("direct-message", (data) => {
      directMessangeHandler(socket, data);
    });
    socket.on("direct-chat-history", (data) => {
      directChatHistory(socket, data);
    });
    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });
    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });
    socket.on("room-leave", (data) => {
      roomLeaveHandler(socket, data);
    });

    socket.on("conn-init", (data) => {
      roomInitConnectionHandler(socket, data);
    });

    socket.on("conn-signal", (data) => {
      roomSingalingDataHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [8000]);
};

module.exports = { registerSocketServer };
