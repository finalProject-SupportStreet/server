import jwt from "jsonwebtoken";
import groupsSchema from "../models/groupsSchema.js";
import GroupsModel from "../models/groupsSchema.js";
import UserModell from "../models/userSchema.js";

//! Man muss angemeldet sein, um eine Gruppe zu erstellen, bearbeiten, löschen ...

/******************************************************
 *    createGroups
 ******************************************************/

export const createGroup = async (req, res, next) => {
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
    const group = new groupsSchema({
      title,
      text,
      creator: creatorId,
    });

    // Speichere den News-Eintrag in der Datenbank
    await group.save();

    // Sende eine Erfolgsantwort zurück
    res.status(201).send(group);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    getAllGroups
 ******************************************************/

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await GroupsModel.find();
    console.log("groups", groups);
    res.status(200).send(groups);
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *   getFollowedGroup
 ******************************************************/
//* Muss noch getestet werden
export const getFollowedGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModell.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // extrahiere die Gruppen-IDs aus dem User-Objekt
    const followedGroupIds = user.groups.map((group) => group.groupId);

    const followedGroups = await Group.find({ _id: { $in: followedGroupIds } });

    return res.status(200).json(followedGroups);
  } catch (error) {
    console.error("Error retrieving followed groups:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/******************************************************
 *   getFollowedGroupByUserId
 ******************************************************/
