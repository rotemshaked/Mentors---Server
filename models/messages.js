const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    require: true,
  },
  receiverId: {
    type: String,
    require: true,
  },
  textMessage: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Messages", MessageSchema);
