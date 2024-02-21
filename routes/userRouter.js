import express from "express";
import {
  deleteUser,
  editUser,
  loginController,
  logoutController,
  registerController,
} from "../controller/userController.js";
import {
  authenticateUser,
  authorizeUser,
} from "../controller/authController.js";

const userRouter = express.Router();

// userRouter.get("/", getUsers);
userRouter.post("/register", registerController);
userRouter.post("/login", authenticateUser, loginController);
userRouter.post("/logout", logoutController);
userRouter.patch("/edit/:id", authorizeUser, editUser);
userRouter.delete("/:id", authorizeUser, deleteUser);

export default userRouter;
