import mongoose from "mongoose";
const { Schema, model } = mongoose;

const groupPostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  text: { type: String, required: true },
  image: { type: String },
  tags: { type: String, required: true },
  privateGroup: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  mods: [{ type: Schema.Types.ObjectId, ref: "users" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "users" }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  comments: [
    {
      text: { type: String, required: true },
      commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      commentTime: { type: Date, default: Date.now },
    },
  ],
});

const GroupsModel = model("groups", groupPostSchema);
export default GroupsModel;
