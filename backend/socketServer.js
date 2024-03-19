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

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [8000]);
};

module.exports = { registerSocketServer };
