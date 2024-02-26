import express from "express";
import { authorizeUser } from "../controller/authController.js";

import {
  createGroup,
  getAllGroups,
  getFollowedGroups,
} from "../controller/groupsController.js";

const groupsRouter = express.Router();

groupsRouter.get("/getAllGroups", getAllGroups);
groupsRouter.get("/getFollowedGroups", authorizeUser, getFollowedGroups);
groupsRouter.post("/createGroup", authorizeUser, createGroup);

export default groupsRouter;
