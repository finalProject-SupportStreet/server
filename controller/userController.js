import UserModell from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwtController.js";
import e from "express";

/******************************************************
 *    registerController
 ******************************************************/

export const registerController = async (req, res) => {
  try {
    const { email, username, plz, password, confirmPassword } = req.body;

    // Überprüfen, ob die E-Mail bereits existiert
    const existingUser = await UserModell.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Registration failed. Please try again." });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 12);

    // Benutzer erstellen und in die Datenbank speichern
    const newUser = await UserModell.create({
      email,
      username,
      plz,
      password: hashedPassword,
    });

    // Erfolgreiche Antwort senden
    res.status(201).send({ message: "User successfully registered" });
  } catch (error) {
    console.error("Registration failed.", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/******************************************************
 *    loginController
 ******************************************************/

export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModell.findOne({ username });
    console.log("user", user);
    if (!user) {
      const error = new Error("Invalid credentials code001");
      error.statusCode = 401;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error = new Error("Invalid credentials code002");
      error.statusCode = 401;
      throw error;
    }

    // Benutzerobjekt in ein normales Objekt umwandeln und das Passwort daraus löschen
    const userObj = user.toObject();
    delete userObj.password;

    // JWT generieren
    const token = generateToken(userObj);
    console.log("TEST TOKEN", token);

    // Benutzer zum req-Objekt hinzufügen
    req.user = userObj;
    console.log("req.user", req.user);
    // Token als Antwort zurück geben
    res.status(200).send({ message: "User successfully logged in", token });
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    logoutController
 ******************************************************/
//* muss hier noch ein JWT Token gelöscht werden?

export const logoutController = async (req, res, next) => {
  res.status(200).json({ message: "Logout erfolgreich" });
};

/******************************************************
 *    editUser
 ******************************************************/
//! Id muss frontendseitig mitgeschickt werden
//! so kann nutzer sowie admin den controller verwenden

export const editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("userId", userId);

    const user = await UserModell.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const {
      email,
      username,
      plz,
      password,
      firstName,
      lastName,
      gender,
      birthday,
      comeFrom,
      familyStatus,
      children,
      pet,
      job,
      aboutMe,
      interests,
      offers,
      activities,
      organizing,
    } = req.body;

    // Prüfe, ob ein Feld im Anfragekörper vorhanden ist und aktualisiere den Benutzer entsprechend
    if (email) user.email = email;
    if (username) user.username = username;
    if (plz) user.plz = plz;
    if (password) user.password = password;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (birthday) user.birthday = birthday;
    if (comeFrom) user.comeFrom = comeFrom;
    if (familyStatus) user.familyStatus = familyStatus;
    if (children) user.children = children;
    if (pet) user.pet = pet;
    if (job) user.job = job;
    if (aboutMe) user.aboutMe = aboutMe;
    if (interests) user.interests = interests;
    if (offers) user.offers = offers;
    if (activities) user.activities = activities;
    if (organizing) user.organizing = organizing;

    await user.save();

    res.status(200).json({ message: "User successfully edited", user });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

/******************************************************
 *    deleteUser
 ******************************************************/

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserModell.findByIdAndDelete(userId);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};
