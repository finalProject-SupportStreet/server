import express from "express";
import {
  createNews,
  deleteNews,
  getNews,
  getNewsByCreatorId,
  updateNews,
} from "../controller/newsController.js";
import { authorizeUser } from "../controller/authController.js";

const newsRouter = express.Router();

newsRouter.get("/news", getNews);
newsRouter.get("/news/:id", getNewsByCreatorId);
newsRouter.post("/create", authorizeUser, createNews);
newsRouter.patch("/update/:id", authorizeUser, updateNews);
newsRouter.delete("/delete/:id", authorizeUser, deleteNews);

export default newsRouter;
