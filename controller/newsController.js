// import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controller/newsController.js';

import NewsModell from "../models/newsSchema.js";

/******************************************************
 *    createNews
 ******************************************************/

export const createNews = async (req, res, next) => {
  try {
    // Überprüfe, ob der JWT-Token im Cookie vorhanden ist
    const token = req.cookies.token;
    console.log("token createNews Controller", token);
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
    const { title, text } = req.body;

    // Erstelle den News-Eintrag unter Verwendung der Benutzer-ID als Schöpfer
    const news = new NewsModel({
      title,
      text,
      creator: creatorId,
    });

    // Speichere den News-Eintrag in der Datenbank
    await news.save();

    // Sende eine Erfolgsantwort zurück
    res.status(201).send(news);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    getNews
 ******************************************************/

export const getNews = async (req, res, next) => {
  try {
    const news = await NewsModell.find();
    res.status(200).send(news);
  } catch (error) {
    next(error);
  }
};
