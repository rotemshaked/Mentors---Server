const { send } = require("express/lib/response");
const CategoriesBL = require("../BL/category");
const internalServerErrorMessage = "Internal server Error";
const invalidUserIdMessage = "Invalid userId";
const incorrectDetailsMessage = "Incorrect details";
const userExistMessage = "User already exists in this category";
const userDoesNotExistMessage = "user does not exist in this category";

const getAllCategoriesAsync = async (req, res) => {
  try {
    const categories = await CategoriesBL.getAllCategoriesAsync();
    res.status(200).send(categories);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const getCategoryByCategoryNameAsync = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      res.status(400).send(invalidUserIdMessage);
    }
    const category = await CategoriesBL.getCategoryByCategoryNameAsync(name);
    if (!category) {
      res.status(404).send(incorrectDetailsMessage);
    }
    res.send(category);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const addCategoryAsync = async (req, res) => {
  try {
    const category = req.body.categoryName;
    const newCategory = await CategoriesBL.addCategoryAsync(category);
    if (!newCategory) {
      res.status(404).send(e);
    }
    res.send(newCategory);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const addUserToCategoryAsync = async (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    const userId = req.user._id;
    const category = await CategoriesBL.addUserToCategoryAsync(
      categoryName,
      userId
    );
    if (!category) {
      res.status(404).send(userExistMessage);
    }
    res.send(category);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const deleteUserfromCategoryAsync = async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryName = req.body.categoryName;
    const category = await CategoriesBL.deleteUserfromCategoryAsync(
      userId,
      categoryName
    );
    if (!userId) {
      res.status(404).send(userDoesNotExistMessage);
    }
    if (!category) {
      res.status(404).send(incorrectDetailsMessage);
    }
    res.send("Deleted successfully");
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

module.exports = {
  addCategoryAsync,
  getAllCategoriesAsync,
  getCategoryByCategoryNameAsync,
  addUserToCategoryAsync,
  deleteUserfromCategoryAsync,
};
