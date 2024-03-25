import jwt from "jsonwebtoken";
import MarketModel from "../models/marketSchema.js";
import UserModell from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

/******************************************************
 *    createMarketItem
 ******************************************************/

export const createMarketItem = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      image,
      tags,
      zip,
      bookmarked,
      offerType,
    } = req.body;

    // Überprüfe, ob der JWT-Token im Cookie vorhanden ist
    const token = req.cookies.token;
    if (!token) {
      const error = new Error(
        "Authorization failed: JWT token not found in cookie"
      );
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.user;

    const creatorId = user._id;

    //! Cloudinary
    // um uploadgröße zu limitieren in server js "app.use(express.json({ limit: "1mb" }));
    let imgURL = "";
    if (image) {
      const cloudinaryRes = await cloudinary.uploader.upload(image);
      imgURL = cloudinaryRes.secure_url;
      console.log("Backend Cloudinary", imgURL);
    }

    const marketItem = new MarketModel({
      title,
      description,
      price,
      image: imgURL,
      tags,
      zip,
      bookmarked,
      offerType,
      creator: creatorId,
    });

    console.log("marketItem im marketController", marketItem);

    const marketItemFromDB = await marketItem.save();
    console.log(marketItemFromDB);
    // console.log(marketItem._id);

    // Füge das marketItem auch zu den User hinzu
    await UserModell.findByIdAndUpdate(creatorId, {
      $push: { marketItems: marketItem._id },
    });

    // Sende eine Erfolgsantwort zurück
    res.status(201).send(marketItem);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    getAllMarketItems (zum testen - falls nicht benötigt, löschen)
 ******************************************************/

export const getAllMarketItems = async (req, res, next) => {
  try {
    const marketItems = await MarketModel.find();
    console.log("marketItems", marketItems);
    res.status(200).send(marketItems);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    getMarketItemByName
 ******************************************************/

export const getMarketItemByName = async (req, res, next) => {
  try {
    const searchParameter = req.params.searchParameter;
    const marketItems = await MarketModel.find({ title: searchParameter });
    res.status(200).send(marketItems);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    getMarketItemByZip
 ******************************************************/

export const getMarketItemByZip = async (req, res, next) => {
  try {
    const zip = req.params.zip;
    const marketItems = await MarketModel.find({ zip: zip });
    res.status(200).send(marketItems);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    editMarketItem
 ******************************************************/

export const editMarketItem = async (req, res, next) => {
  try {
    const marketItemId = req.params.id;
    const { free, title, description, price, image, tags, bookmarked, zip } =
      req.body;

    const userId = req.user.user._id;

    // Überprüfen, ob der Benutzer der Ersteller des Market-Items ist
    const marketItem = await MarketModel.findOne({
      _id: marketItemId,
      creator: userId,
    });

    if (!marketItem) {
      const error = new Error("Market item not found");
      error.statusCode = 404;
      throw error;
    }

    // Aktualisiere das Market-Item
    marketItem.free = free || marketItem.free;
    marketItem.title = title || marketItem.title;
    marketItem.text = description || marketItem.text;
    marketItem.price = price || marketItem.price;
    marketItem.image = image || marketItem.image;
    marketItem.tags = tags || marketItem.tags;
    marketItem.zip = zip || marketItem.zip;
    marketItem.bookmarked = bookmarked || marketItem.bookmarked;
    // marketItem.city = city || marketItem.city;
    // marketItem.street = street || marketItem.street;

    await marketItem.save();

    res.status(200).send({ message: "MarktItem updated successfully." });
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *   deleteMarktItem
 ******************************************************/

export const deleteMarketItem = async (req, res, next) => {
  try {
    const marketItemId = req.params.id;
    const userId = req.user.user._id;

    // Überprüfen, ob der Benutzer der Ersteller des Market-Items ist
    const marketItem = await MarketModel.findOne({
      _id: marketItemId,
      creator: userId,
    });

    if (!marketItem) {
      const error = new Error("Market item not found");
      error.statusCode = 404;
      throw error;
    }

    // Löschen des Items
    await MarketModel.findByIdAndDelete(marketItemId);

    res.status(200).send({ message: "Market item deleted successfully." });
  } catch (error) {
    next(error);
  }
};
