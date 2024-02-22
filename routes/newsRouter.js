import express from "express";
import {
  createNews,
  deleteNews,
  getFeed,
  getNews,
  getNewsByCreatorId,
  updateNews,
} from "../controller/newsController.js";
import { authorizeUser } from "../controller/authController.js";

const newsRouter = express.Router();

newsRouter.get("/news", getNews);
newsRouter.get("/news/:id", getNewsByCreatorId);
newsRouter.get("/feed", authorizeUser, getFeed);
newsRouter.post("/create", authorizeUser, createNews);
newsRouter.patch("/update/:id", authorizeUser, updateNews);
newsRouter.delete("/delete/:id", authorizeUser, deleteNews);

export default newsRouter;
