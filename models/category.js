const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  usersInCategory: {
    type: [],
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
