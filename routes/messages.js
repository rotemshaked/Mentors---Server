const express = require("express");
const auth = require("../middleware/auth");

const { addMessageAsync } = require("../controllers/messages");

const messagesRouter = express.Router();

messagesRouter.post("/", auth, addMessageAsync);

module.exports = messagesRouter;
