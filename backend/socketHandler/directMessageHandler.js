const Message = require("../models/Message");
const Conversation = require("../models/conversation");
const { updateChatHistory } = require("./updates/chat");
exports.directMessangeHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    // create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });
    // find if converstaion exist with this two user - if not create new

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      updateChatHistory(conversation._id.toString());
    } else {
      // create a new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update to sender and reciever if is online
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
