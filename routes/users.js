const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllUsersAsync,
  addUserAsync,
  updateUserByUserIdAsync,
  deleteUserAsync,
  loginUserAsync,
  getProfile,
  logoutUserAsync,
} = require("../controllers/users");

const userRouter = express.Router();

userRouter.get("/", getAllUsersAsync);

userRouter.get("/me", auth, getProfile);

userRouter.post("/signup", addUserAsync);

userRouter.delete("/me", auth, deleteUserAsync);

userRouter.put("/me", auth, updateUserByUserIdAsync);

userRouter.post("/login", loginUserAsync);

userRouter.post("/logout", auth, logoutUserAsync);

module.exports = userRouter;
