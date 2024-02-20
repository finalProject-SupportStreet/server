import { Schema, model } from "mongoose";

const newsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now, // Verwendet die aktuelle Zeit beim Erstellen des News-Eintrags
  },
});

//!  zu meinem feed gehören auch bilder! da diese aber seperat gespeichert werden (cloudinary) kann ich nix auf require setzen oder?
// Mein feed soll nach erstellen des Posts geordnet werden.

const NewsModell = model("News", newsSchema, "news");
export default NewsModell;
