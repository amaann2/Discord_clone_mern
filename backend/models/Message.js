const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
