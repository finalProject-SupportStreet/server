import mongoose from "mongoose";
const { Schema, model } = mongoose;

const marketSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  zip: { type: String },
  creationTime: { type: Date, default: Date.now },
  savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Liste der Benutzer, die dieses Element gespeichert haben
});

const MarketModel = model("MarketItem", marketSchema, "marketItems");
export default MarketModel;
