import express from "express";
import {
  deleteUser,
  editUser,
  loginController,
  logoutController,
  registerController,
  loadMapController
} from "../controller/userController.js";
import {
  authenticateUser,
  authorizeUser,
} from "../controller/authController.js";

const userRouter = express.Router();

userRouter.get("/neighbours", authorizeUser, loadMapController)

//! Wichtig: /delete/:id ist für news
//!          /:id ist für user
userRouter.post("/register", registerController);
userRouter.post("/login", authenticateUser, loginController);
userRouter.post("/logout", logoutController);
userRouter.patch("/edit/:id", authorizeUser, editUser);
userRouter.delete("/:id", authorizeUser, deleteUser);

export default userRouter;
