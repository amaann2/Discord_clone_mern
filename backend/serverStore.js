const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let activeRooms = [];

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};
const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

const getActiveUsers = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

// rooms
const getActiveRooms = () => {
  return [...activeRooms];
};
const getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find(
    (activeroom) => activeroom.roomId === roomId
  );
  return {
    ...activeRoom,
  };
};
const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };
  activeRooms = [...activeRooms, newActiveRoom];

  return newActiveRoom;
};

const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

  const updatedroom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };

  activeRooms.push(updatedroom);
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };

    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};
module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveUsers,
  getActiveRooms,
  getActiveRoom,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
};
