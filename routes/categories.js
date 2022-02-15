const express = require("express");
const auth = require("../middleware/auth");
const {
  addCategoryAsync,
  getAllCategoriesAsync,
  getCategoryByCategoryNameAsync,
  addUserToCategoryAsync,
  deleteUserfromCategoryAsync,
} = require("../controllers/category");

const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategoriesAsync);

categoriesRouter.post("/", addCategoryAsync);

categoriesRouter.get("/:name", getCategoryByCategoryNameAsync);

categoriesRouter.post("/usersInCategory", auth, addUserToCategoryAsync);

categoriesRouter.delete("/usersInCategory", auth, deleteUserfromCategoryAsync);

module.exports = categoriesRouter;
