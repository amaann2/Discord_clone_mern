const jwt = require("jsonwebtoken");
const config = process.env;

const verifyTokenSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET_KEY);
    socket.user = decoded;
  } catch (error) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
