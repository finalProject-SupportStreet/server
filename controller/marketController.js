import jwt from "jsonwebtoken";
import MarketModel from "../models/marketSchema.js";
import UserModell from "../models/userSchema.js";

/******************************************************
 *    createMarketItem
 ******************************************************/

export const createMarketItem = async (req, res, next) => {
  try {
    // Überprüfe, ob der JWT-Token im Cookie vorhanden ist
    const token = req.cookies.token;

    if (!token) {
      const error = new Error(
        "Authorization failed: JWT token not found in cookie"
      );
      error.statusCode = 401;
      throw error;
    }
    // Extrahiere den Benutzer aus dem JWT-Token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.user;

    // Benutzer-ID des eingeloggten Benutzers
    const creatorId = user._id;

    // Lese die Daten aus dem Anfragekörper
    const { free, title, text, price, image, tags, follow, city, zip, street } =
      req.body;

    // Erstelle den Market-Eintrag unter Verwendung der Benutzer-ID als Schöpfer
    const marketItem = new MarketModel({
      free,
      title,
      text,
      price,
      image,
      tags,
      follow,
      creator: creatorId,
      city,
      zip,
      street,
    });

    console.log("marketItem im marketController", marketItem);
    // Speichere den Market-Eintrag in der Datenbank
    await marketItem.save();

    // Füge das marketItem auch zu den User hinzu
    await UserModell.findByIdAndUpdate(creatorId, {
      $push: { marketItems: { itemId: marketItem._id } },
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
    const { free, title, text, price, image, tags, follow, city, zip, street } =
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
    marketItem.text = text || marketItem.text;
    marketItem.price = price || marketItem.price;
    marketItem.image = image || marketItem.image;
    marketItem.tags = tags || marketItem.tags;
    marketItem.follow = follow || marketItem.follow;
    marketItem.city = city || marketItem.city;
    marketItem.zip = zip || marketItem.zip;
    marketItem.street = street || marketItem.street;

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
