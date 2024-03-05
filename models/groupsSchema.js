import mongoose from "mongoose";
const { Schema, model } = mongoose;

const groupPostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  text: { type: String, required: true },
  image: { type: String },
  tags: { type: String, required: true },
  privateGroup: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  mods: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

const GroupsModel = model("GroupPost", groupPostSchema, "groups");
export default GroupsModel;
