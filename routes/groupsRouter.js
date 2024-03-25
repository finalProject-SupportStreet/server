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
  getSearchGroups,
  createGroupPost,
} from "../controller/groupsController.js";

const groupsRouter = express.Router();

groupsRouter.get("/getAllGroups", getAllGroups);
groupsRouter.get("/getFollowedGroups", authorizeUser, getFollowedGroups);
groupsRouter.get("/getFollowedGroups/:id", getFollowedGroupByUserId);
groupsRouter.get("/getSearchGroups/:search", authorizeUser, getSearchGroups);
groupsRouter.post("/createGroup", authorizeUser, createGroup);
groupsRouter.post("/createGroupPost/:id", authorizeUser, createGroupPost);
groupsRouter.post("/followGroup/:id", authorizeUser, followGroup);
groupsRouter.patch("/editGroup/:id", authorizeUser, editGroup);
groupsRouter.delete("/unfollowGroup/:id", authorizeUser, unfollowGroup);
groupsRouter.delete("/deleteGroup/:id", authorizeUser, deleteGroup);

export default groupsRouter;
