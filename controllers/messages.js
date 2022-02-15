const { send } = require("express/lib/response");
const MessageBL = require("../BL/messages");
const internalServerErrorMessage = "Internal server Error";
const incorrectDetailsMessage = "Incorrect details";

const addMessageAsync = async (req, res) => {
  try {
    const textMessage = req.body.textMessage;
    const senderId = req.user._id;
    const receiverId = req.body.receiverId;
    const newMessage = await MessageBL.addMessageAsync(
      senderId,
      receiverId,
      textMessage
    );

    if (!newMessage) {
      res.status(404).send(incorrectDetailsMessage);
    }
    res.send(newMessage);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

module.exports = {
  addMessageAsync,
};
