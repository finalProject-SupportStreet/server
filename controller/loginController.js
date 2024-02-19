import bcrypt from "bcrypt";
import { generateToken } from "./jwtController.js";
import UserModell from "../models/userSchema.js";

/******************************************************
 *    loginController
 ******************************************************/

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModell.findOne({ email: email });

    // User (email) in DB finden
    if (!user) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    // Passwort vergleichen
    if (!match) {
      const error = new Error("Wrong password");
      error.status = 402;
      throw error;
    }

    // Benutzerobjekt in ein normales Objekt umwandeln und das Passwort daraus löschen
    const userObj = user.toObject();
    delete userObj.password;

    // JWT generieren
    const token = generateToken(userObj);
    /* console.log("TEST TOKEN", token); */

    // Token als Antwort zurück geben
    res.status(200).send({ message: "Benutzer erfolgreich eingeloggt", token });
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    registerController
 ******************************************************/

export const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Überprüfen, ob die E-Mail bereits existiert
    const existingUser = await UserModell.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "User already exist" });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 12);

    // Benutzer erstellen und in die Datenbank speichern
    const newUser = await UserModell.create({
      username,
      password: hashedPassword,
      role: userRoles.REGULAR_USER,
    });

    // Erfolgreiche Antwort senden
    res.status(201).send({ message: "Benutzer erfolgreich registriert" });
  } catch (error) {
    console.error("Fehler bei der Benutzerregistrierung:", error);
    res.status(500).send({ message: "Interner Serverfehler" });
  }
};
