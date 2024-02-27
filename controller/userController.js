import UserModell from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwtController.js";
import jwt from "jsonwebtoken";

/******************************************************
 *    registerController
 ******************************************************/

export const registerController = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      address,
      followUsers,
      groups,
    } = req.body;

    // Überprüfen, ob die E-Mail bereits existiert
    const existingUser = await UserModell.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Email already exists. Please try again." });
    }

    // Überprüfen, ob das Passwort und die Bestätigung übereinstimmen
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 12);

    // Benutzer erstellen und in die Datenbank speichern
    const newUser = await UserModell.create({
      email,
      firstName,
      password: hashedPassword,
      address,
      followUsers,
      groups,
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
  console.log("starte loginController");
  try {
    const { email, password } = req.body;

    console.log("email", email, password);
    const user = await UserModell.findOne({ email });
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

    // Hier das `user`-Objekt  festlegen, bevor es in das JWT eingefügt wird
    user.toObject();
    delete user.password;
    const userForJwt = user;

    // Generiere ein JWT mit dem `userForJwt`-Objekt als Payload
    const accessToken = jwt.sign({ user: userForJwt }, process.env.JWT_SECRET);

    console.log(accessToken);
    // 2. sende es als cookie zurück an den client
    res
      .cookie("token", accessToken, {
        httpOnly: true, // Der Cookie kann nicht durch javascript im client ausgelesen werden. Der server und browser schicken ihn nur per http hin und zurück. Das ist eine Sicherheitsmaßnahme.

        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
      })

      .send({ msg: "cookie wurde gesetzt" });
  } catch (error) {
    next(error);
  }
};

/******************************************************
 *    logoutController
 ******************************************************/
//! muss hier noch ein JWT Token gelöscht werden?

export const logoutController = async (req, res) => {
  console.log("user ausgelogt");
  res.clearCookie("token");
  res.status(200).send("cookie cleared. User logged out.");
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
      address,
    } = req.body;

    // Prüfe, ob ein Feld im Anfragekörper vorhanden ist und aktualisiere den Benutzer entsprechend
    if (email) user.email = email;
    if (plz) user.address[0].plz = plz;
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
    if (address) {
      user.address = address; // Aktualisiere die Adresse
    }

    await user.save();

    res.status(200).send({ message: "User successfully edited", user });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(error.status || 500).send({ message: error.message });
  }
};

/******************************************************
 *    deleteUser
 ******************************************************/

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserModell.findByIdAndDelete(userId);
    res.status(200).send({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};
