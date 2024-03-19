/******************************************************
 *    authenticateUser
 *    für login
 ******************************************************/
import bcrypt from "bcrypt";
import UserModell from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  // 1. Extrahiere Benutzername und Passwort aus dem Anforderungskörper
  const { email, password } = req.body;
  // 2. Suche nach dem Benutzer mit dem angegebenen Benutzernamen in der Datenbank
  const user = await UserModell.findOne({ email });

  // 3. Wenn kein Benutzer mit dem angegebenen Benutzernamen gefunden wurde, sende einen Fehler zurück
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401; // Unautorisiert
    throw error;
  }

  // 4. Überprüfe, ob das angegebene Passwort mit dem Passwort des Benutzers übereinstimmt
  const match = await bcrypt.compare(password, user.password);

  // 5. Wenn das Passwort nicht übereinstimmt, sende einen Fehler zurück
  if (!match) {
    const error = new Error("Incorrect password");
    error.statusCode = 401; // Unautorisiert
    throw error;
  }

  // 6. Wenn alles erfolgreich ist, rufe die nächste Middleware oder den Controller auf
  next();
};

/******************************************************
 *    authorizeUser
 *    wenn der user eingeloggt ist
 ******************************************************/
export const authorizeUser = (req, res, next) => {
  // 1. wir nehmen den jwt aus dem Request
  const token = req.cookies.token;

  // 2. Wenn es keinen token gibt, senden wir einen fehler zurück
  if (!token) return res.send("no cookie found. you are not authorized.");
  // 3. wenn es einen token gibt, versuchen wir ihn zu verifizieren
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // 4. bei einem fehler, senden wir einen error zurück
    if (err) return res.send("falscher token");
    // wir wollen den user in der nächsten middleware verwenden.
    req.user = user;
    // console.log("req.user authController", user);
    // 5. wenn alles geklappt hat, führen wir next() aus.
    next();
  });
};
