import jwt from "jsonwebtoken";
import NewsModell from "../models/newsSchema.js";
import UserModell from "../models/userSchema.js";

/******************************************************
 *    createNews
 ******************************************************/

export const createNews = async (req, res, next) => {
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
    const { title, text } = req.body;

    // Erstelle den News-Eintrag unter Verwendung der Benutzer-ID als Schöpfer
    const news = new NewsModell({
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
    console.log("news", news);
    res.status(200).send(news);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *   getFeed
 * ******************************************************/
//! MARKTPLATZ UND GRUPPEN FEHLEN NOCH!!!
export const getFeed = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userNews = await UserModell.findById(userId);
    const followUsers = user.followUsers.map(
      (followUser) => followUser.username
    );

    // Finde die News der Benutzer, denen der aktuelle Benutzer folgt
    const followUsersNews = await NewsModel.find({
      creator: { $in: followUsers },
    });

    // Kombiniert News des Benutzers und seiner Freunde
    const feed = [...userNews, ...followUsersNews];

    // Sortiert News nach creationTime in absteigender Reihenfolge
    feed.sort((a, b) => b.creationTime - a.creationTime);

    res.status(200).send(feed);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    getNewsByCreatorId
 ******************************************************/

export const getNewsByCreatorId = async (req, res, next) => {
  try {
    const creatorId = req.params.id;
    console.log("creatorId", creatorId);
    const news = await NewsModell.find({ creator: creatorId });
    res.status(200).send(news);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    updateNews
 ******************************************************/
export const updateNews = async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const { title, text } = req.body;
    const news = await NewsModell.findById({ _id: newsId });
    news.title = title;
    news.text = text;
    await news.save();
    res.status(200).send(news);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    deleteNews
 ******************************************************/

export const deleteNews = async (req, res, next) => {
  try {
    const newsId = req.params.id;

    await NewsModell.findByIdAndDelete(newsId);
    res.status(200).send({ message: "News successfully deleted" });
  } catch (error) {
    next(error);
  }
};
