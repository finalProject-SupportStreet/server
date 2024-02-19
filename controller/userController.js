import UserModell from "../models/userSchema.js";
import bcrypt from "bcrypt";

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

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModell.findOne({ username });

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
    /* console.log("TEST TOKEN", token); */

    // Token als Antwort zurück geben
    res.status(200).send({ message: "Benutzer erfolgreich eingeloggt", token });
  } catch (error) {
    next(error);
  }
};
