const Messages = require("../models/messages");
const { v4: uuidv4 } = require("uuid");
const { getUserByUserIdAsync } = require("./users");

const addMessageAsync = async (senderId, receiverId, textMessage) => {
  const sender = await getUserByUserIdAsync(senderId);
  const receiver = await getUserByUserIdAsync(receiverId);
  if (sender && receiver) {
    const newMessage = new Messages({
      senderId: senderId,
      receiverId: receiverId,
      textMessage: textMessage,
    });
    sender.inbox.sentMessages.push(newMessage);
    await sender.save();
    receiver.inbox.receivedMessages.push(newMessage);
    await receiver.save();
    return newMessage;
  } else return;
};

module.exports = {
  addMessageAsync,
};
