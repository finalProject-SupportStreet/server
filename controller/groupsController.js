import jwt from "jsonwebtoken";
import groupsSchema from "../models/groupsSchema.js";
import GroupsModel from "../models/groupsSchema.js";
import UserModell from "../models/userSchema.js";

import mongoose from "mongoose";
const { startSession } = mongoose;

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
    const { title, text, image, privateGroup } = req.body;

    // Erstelle den News-Eintrag unter Verwendung der Benutzer-ID als Schöpfer
    const group = new groupsSchema({
      title,
      text,
      image,
      admins: [creatorId], // Füge den Ersteller auch als Admin hinzu
      creator: creatorId,
      privateGroup,
    });

    // Speichere den News-Eintrag in der Datenbank
    await group.save();

    // Füge die Gruppe auch zu den Benutzergruppen hinzu
    await UserModell.findByIdAndUpdate(creatorId, {
      $push: { groups: { groupId: group._id } },
    });

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
//* um zu testen den Token in TC im header rein kopieren
//* Header -> häkchen bei Cookie setzen -> token=easdasdasc ... "token=..." am anfang nicht vergessen

export const getFollowedGroups = async (req, res) => {
  try {
    const userId = req.user.user._id;
    console.log("userId", userId);
    const user = await UserModell.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // extrahiere die Gruppen-IDs aus dem User-Objekt
    const followedGroupIds = user.groups.map((group) => group.groupId);

    const followedGroups = await GroupsModel.find({
      _id: { $in: followedGroupIds },
    });

    return res.status(200).send(followedGroups);
  } catch (error) {
    console.error("Error retrieving followed groups:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/******************************************************
 *   getFollowedGroupByUserId
 ******************************************************/

export const getFollowedGroupByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId in getFollowedGroupByUserId controller", userId);

    const user = await UserModell.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // extrahiere die Gruppen-IDs aus dem User-Objekt
    const followedGroupIds = user.groups.map((group) => group.groupId);

    const followedGroups = await GroupsModel.find({
      _id: { $in: followedGroupIds },
    });
    return res.status(200).send(followedGroups);
  } catch (error) {
    console.error("Error retrieving followed groups:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/******************************************************
 *   editGroup  (gruppen id in params übergeben)
 ******************************************************/

export const editGroup = async (req, res) => {
  try {
    // Überprüfe, ob req.user und req.user._id definiert sind
    if (!req.user || !req.user.user._id) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const groupParamId = req.params.id;
    console.log("groupParamId groupsController :", groupParamId);
    // Extrahieren der benötigten Daten aus der Anfrage
    const { title, text, image, tags, privateGroup, members, mods, admins } =
      req.body;
    const userId = req.user.user._id;
    console.log("userId editGroup Controller: ", userId, req.body);

    // Überprüfen, ob der Benutzer Admin der Gruppe ist
    const group = await GroupsModel.findOne({
      _id: groupParamId,
      admins: userId,
    });
    console.log("group editGroup Controller: ", group);

    if (!group) {
      return res
        .status(403)
        .send({ message: "You are not authorized to edit this group." });
    }

    // Aktualisieren der Gruppendaten
    group.title = title;
    group.text = text;
    group.image = image;
    group.tags = tags;
    group.privateGroup = privateGroup;
    group.members = members;
    group.mods = mods;
    group.admins = admins;

    // Speichern der aktualisierten Gruppe
    await group.save();

    return res.status(200).send({ message: "Group updated successfully." });
  } catch (error) {
    console.error("Error editing group:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

/******************************************************
 *   followGroup (pusht eingeloggten nutzer in Gruppe (members))
 ******************************************************/
//! Transaktionale Operationen
// Transaktionale Operationen sind Operationen in einer Datenbank, die als eine einzige logische Einheit ausgeführt werden. Sie werden entweder vollständig ausgeführt oder vollständig abgebrochen, um Datenkonsistenz sicherzustellen. Wenn man viele operationen in einem Zug ausführen will

export const followGroup = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const groupId = req.params.id;

    // Überprüfen, ob der Benutzer bereits Mitglied der Gruppe ist
    const group = await GroupsModel.findOne({
      _id: groupId,
      members: userId,
    });

    if (group) {
      return res.status(400).send({ message: "You are already a member." });
    }

    // Transaktionale Operationen

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Benutzer zur Gruppe hinzufügen
      await GroupsModel.findByIdAndUpdate(
        groupId,
        { $push: { members: userId } },
        { session }
      );

      // Gruppe zum Benutzer hinzufügen
      await UserModell.findByIdAndUpdate(
        userId,
        { $push: { groups: { groupId: groupId } } },
        { session }
      );

      // Transaktion abschließen
      await session.commitTransaction();
    } catch (error) {
      // Bei einem Fehler die Transaktion rückgängig machen
      await session.abortTransaction();
      throw error;
    } finally {
      // Transaktionssitzung beenden
      session.endSession();
    }

    return res
      .status(200)
      .send({ message: "You have successfully joined the group." });
  } catch (error) {
    console.error("Error following group:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

/******************************************************
 *   unfollowGroup (entfernt Benutzer aus Gruppe und Gruppe aus Benutzer)
 ******************************************************/

export const unfollowGroup = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const groupId = req.params.id;

    // Überprüfen, ob der Benutzer Mitglied der Gruppe ist
    const group = await GroupsModel.findOne({
      _id: groupId,
      members: userId,
    });

    if (!group) {
      return res
        .status(400)
        .send({ message: "You are not a member of this group." });
    }

    // Benutzer aus der Gruppe entfernen
    await GroupsModel.findByIdAndUpdate(groupId, {
      $pull: { members: userId },
    });

    // Gruppe aus der Liste der Gruppen des Benutzers entfernen
    await UserModell.findByIdAndUpdate(userId, {
      $pull: { groups: { groupId: groupId } },
    });

    return res
      .status(200)
      .send({ message: "You have successfully unfollowed the group." });
  } catch (error) {
    console.error("Error unfollowing group:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};

/******************************************************
 *   deleteGroup (löscht Gruppe - NUR ADMIN)
 ******************************************************/
export const deleteGroup = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const groupId = req.params.id;

    // Überprüfen, ob der Benutzer Admin der Gruppe ist
    const group = await GroupsModel.findOne({
      _id: groupId,
      admins: userId,
    });
    console.log("group deleteGroup Controller: ", group);
    if (!group) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this group." });
    }

    // Löschen der Gruppe
    await GroupsModel.findByIdAndDelete(groupId);

    return res.status(200).send({ message: "Group deleted successfully." });
  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};
