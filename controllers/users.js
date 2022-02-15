const { send } = require("express/lib/response");
const UsersBL = require("../BL/users");
const internalServerErrorMessage = "Internal server Error";
const invalidUserIdMessage = "Invalid userId";
const incorrectDetailsMessage = "Incorrect details";
const UnableToLoginMessage = "Unable to login";

const getAllUsersAsync = async (req, res) => {
  try {
    const users = await UsersBL.getAllUsersAsync();
    res.status(200).send(users);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const getProfile = async (req, res) => {
  res.send(req.user);
};

// const getUserByUserIdAsync = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       res.status(400).send(invalidUserIdMessage);
//     }
//     const user = await UsersBL.getUserByUserIdAsync(id);
//     if (!user) {
//       res.status(404).send(incorrectDetailsMessage);
//     }
//     res.send(user);
//   } catch {
//     res.status(500).send(internalServerErrorMessage);
//   }
// };

const addUserAsync = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const newUserAndToken = await UsersBL.addUserAsync(user);
    if (!newUserAndToken) {
      res.status(404).send(incorrectDetailsMessage);
    }
    res.send(newUserAndToken);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const updateUserByUserIdAsync = async (req, res) => {
  try {
    const user = req.user;
    const reqBody = req.body;
    const newUserAndToken = await UsersBL.updateUserByUserIdAsync(
      reqBody,
      user
    );
    if (!newUserAndToken) {
      res.status(404).send(incorrectDetailsMessage);
    }
    res.send(newUserAndToken);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const deleteUserAsync = async (req, res) => {
  try {
    const userId = req.user._id;
    const newUser = await UsersBL.deleteUserAsync(userId);
    if (!newUser) {
      res.status(404).send(incorrectDetailsMessage);
    }
    res.send("Deleted successfully");
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const loginUserAsync = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const newUserAndToken = await UsersBL.loginUserAsync(
      userEmail,
      userPassword
    );
    if (!newUserAndToken) {
      res.status(404).send(UnableToLoginMessage);
    }
    res.send(newUserAndToken);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

const logoutUserAsync = async (req, res) => {
  try {
    const user = req.user;
    const token = req.token;
    const userAfterFilteringTokens = UsersBL.logoutUserAsync(user, token);
    res.send(userAfterFilteringTokens);
  } catch {
    res.status(500).send(internalServerErrorMessage);
  }
};

module.exports = {
  getAllUsersAsync,
  // getUserByUserIdAsync,
  addUserAsync,
  updateUserByUserIdAsync,
  deleteUserAsync,
  loginUserAsync,
  getProfile,
  logoutUserAsync,
};
