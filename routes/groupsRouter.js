import express from "express";
import { authorizeUser } from "../controller/authController.js";

import {
  createGroup,
  getAllGroups,
  getFollowedGroupByUserId,
  editGroup,
  getFollowedGroups,
  followGroup,
  unfollowGroup,
  deleteGroup,
} from "../controller/groupsController.js";

const groupsRouter = express.Router();

groupsRouter.get("/getAllGroups", getAllGroups);
groupsRouter.get("/getFollowedGroups", authorizeUser, getFollowedGroups);
groupsRouter.get("/getFollowedGroups/:id", getFollowedGroupByUserId);
groupsRouter.post("/createGroup", authorizeUser, createGroup);
groupsRouter.patch("/editGroup/:id", authorizeUser, editGroup);
groupsRouter.post("/followGroup/:id", authorizeUser, followGroup);
groupsRouter.delete("/unfollowGroup/:id", authorizeUser, unfollowGroup);
groupsRouter.delete("/deleteGroup/:id", authorizeUser, deleteGroup);

export default groupsRouter;
