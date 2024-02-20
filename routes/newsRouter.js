import express from "express";
import { createNews } from "../controller/newsController.js";
import { authorizeUser } from "../controller/authController.js";

// import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controller/newsController.js';

const newsRouter = express.Router();

newsRouter.post("/create", authorizeUser, createNews);

export default newsRouter;
