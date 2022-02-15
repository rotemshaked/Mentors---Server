const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");

const getAllUsersAsync = async () => {
  const users = await Users.find();
  return users;
};

const getUserByUserIdAsync = async (id) => {
  const user = await Users.findById(id);
  return user;
};

const addUserAsync = async (user) => {
  const newUser = new Users({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isMentor: user.isMentor,
    role: user.role,
    yearsOfExperience: user.yearsOfExperience,
    city: user.city,
    picture: user.picture,
    password: user.password,
  });
  const theUser = await newUser.save();
  const token = await theUser.generateAuthToken();
  return { newUser, token };
};

const updateUserByUserIdAsync = async (reqBody, user) => {
  const token = await user.generateAuthToken();
  if (!user) return;
  if (reqBody.firstName) {
    user.firstName = reqBody.firstName;
    await user.save();
  }
  if (reqBody.lastName) {
    user.lastName = reqBody.lastName;
    await user.save();
  }
  if (reqBody.email) {
    user.email = reqBody.email;
    await user.save();
  }
  if (reqBody.isMentor) {
    user.isMentor = reqBody.isMentor;
    await user.save();
  }
  if (reqBody.role) {
    user.role = reqBody.role;
    await user.save();
  }
  if (reqBody.yearsOfExperience) {
    user.yearsOfExperience = reqBody.yearsOfExperience;
    await user.save();
  }
  if (reqBody.city) {
    user.city = reqBody.city;
    await user.save();
  }
  if (reqBody.picture) {
    user.picture = reqBody.picture;
    await user.save();
  }
  return { user, token };
};

const deleteUserAsync = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) return;
  await Users.deleteOne({ _id: userId });
  return "Deleted successfully ";
};

const loginUserAsync = async (userEmail, userPassword) => {
  const user = await Users.findByCardentialsAsync(userEmail, userPassword);
  const token = await user.generateAuthToken();
  if (!token) return;
  return { user, token };
};

const logoutUserAsync = async (user, token) => {
  user.tokens = user.tokens.filter((eachToken) => {
    return eachToken.token !== token;
  });
  await user.save();
  return user;
};

module.exports = {
  getAllUsersAsync,
  getUserByUserIdAsync,
  addUserAsync,
  updateUserByUserIdAsync,
  deleteUserAsync,
  loginUserAsync,
  logoutUserAsync,
};
