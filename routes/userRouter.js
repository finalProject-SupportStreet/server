import express from "express";
import { registerController } from "../controller/userController.js";

const userRouter = express.Router();

// userRouter.get("/", getUsers);
userRouter.post("/register", registerController);
// userRouter.patch("/edit", editUser);
// userRouter.patch("/edit",tokenVerify, editUser); wenn man die Middleware einbauen möchte
// userRouter.delete("/:id", deleteUser);

export default userRouter;
