import mongoose from "mongoose";
const { Schema, model } = mongoose;


const marketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  image: { type: String },
  tags: [{ type: String, required: true }], // Kategorien
  zip: {type: String, required: true},
  offerType: { type: String }, //~ Verkaufen, Verschenken
  bookmarked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List von Benutzer-IDs, die dem Artikel folgen
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  }
});

const MarketModel = model("Market", marketSchema, "market");

export default MarketModel;
