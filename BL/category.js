const { getUserByUserIdAsync } = require("./users");
const Category = require("../models/category");
const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");

const getAllCategoriesAsync = async () => {
  return await Category.find();
};

const getCategoryByCategoryNameAsync = async (name) => {
  console.log(name);

  const user = await Category.find({ categoryName: name });
  return user;
};

const addCategoryAsync = async (category) => {
  const checkIfExist = await Category.find({ categoryName: category });
  if (checkIfExist[0]) {
    return;
  }
  const newCategory = new Category({
    categoryName: category,
  });
  await newCategory.save();
  return newCategory;
};

const addUserToCategoryAsync = async (categoryName, userId) => {
  const category = await Category.findOne({ categoryName: categoryName });
  await Category.updateOne(
    { categoryName: categoryName },
    {
      $push: { usersInCategory: userId },
    }
  );
  await Users.updateOne(
    { _id: userId },
    {
      $push: { category: categoryName },
    }
  );
  return category;
};

const deleteUserfromCategoryAsync = async (userId, categoryName) => {
  await Category.updateOne(
    { categoryName: categoryName },
    {
      $pull: { usersInCategory: { $in: [userId] } },
    }
  );

  await Users.updateOne(
    { _id: userId },
    {
      $pull: { category: { $in: [categoryName] } },
    }
  );
  return "deleted";
};

module.exports = {
  addCategoryAsync,
  getAllCategoriesAsync,
  getCategoryByCategoryNameAsync,
  addUserToCategoryAsync,
  deleteUserfromCategoryAsync,
};
