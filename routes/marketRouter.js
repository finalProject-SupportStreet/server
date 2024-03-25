import express from "express";
import { authorizeUser } from "../controller/authController.js";

import {
  createMarketItem,
  deleteMarketItem,
  editMarketItem,
  getAllMarketItems,
  getMarketItemByZip,
  getMarketItemByName,
} from "../controller/marketController.js";

const marketRouter = express.Router();

marketRouter.get("/getAllMarketItems", authorizeUser, getAllMarketItems);
marketRouter.get("/getMarketItemByZip/:zip", authorizeUser, getMarketItemByZip);
marketRouter.get(
  "/getMarketItemByName/:searchParameter",
  authorizeUser,
  getMarketItemByName
);

marketRouter.post("/createMarketItem", authorizeUser, createMarketItem);
marketRouter.patch("/editMarketItem/:id", authorizeUser, editMarketItem);
marketRouter.delete("/deleteMarketItem/:id", authorizeUser, deleteMarketItem);

export default marketRouter;
