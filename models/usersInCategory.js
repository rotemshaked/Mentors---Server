const mongoose = require("mongoose");

var usersInCategory = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  usersInCategory: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model("UsersInCategory", usersInCategory);
