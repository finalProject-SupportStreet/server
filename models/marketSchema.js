import mongoose from "mongoose";
const { Schema, model } = mongoose;

const marketSchema = new Schema({
  free: { type: Boolean, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number },
  image: { type: String },
  tags: [{ type: String }], // Kategorien
  follow: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List von Benutzer-IDs, die dem Artikel folgen
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  street: { type: String },
});

const MarketModel = model("Market", marketSchema, "market");
export default MarketModel;
