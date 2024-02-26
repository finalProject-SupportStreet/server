import mongoose from "mongoose";
const { Schema, model } = mongoose;

const marketSchema = new Schema({
  typ: { type: Boolean, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number },
  image: { type: String },
  tags: [{ type: String }], // Kategorien
  follow: { type: Boolean },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  location: { type: String, required: true },
  zip: { type: Number, required: true },
  street: { type: String },
  image: { type: String },
  comments: [
    {
      text: { type: String, required: true },
      commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      commentTime: { type: Date, default: Date.now },
    },
  ],
});

const MarketModel = model("Market", marketSchema, "market");
export default MarketModel;
