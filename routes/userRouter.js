import express from "express";
import {
  deleteUser,
  editUser,
  loginController,
  logoutController,
  registerController,
} from "../controller/userController.js";

const userRouter = express.Router();

// userRouter.get("/", getUsers);
userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);
userRouter.patch("/edit/:id", editUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
