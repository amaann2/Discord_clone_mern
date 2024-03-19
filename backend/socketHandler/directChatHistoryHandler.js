const Conversation = require("../models/conversation");
const { updateChatHistory } = require("./updates/chat");

exports.directChatHistory = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};
