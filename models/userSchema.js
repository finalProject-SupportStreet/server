import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  plz: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  blockedUsers: [
    {
      username: { type: String },
      id: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  birthday: { type: Date },
  since: { type: Date },
  comeFrom: { type: String },
  familyStatus: { type: String },
  children: { type: Boolean },
  pet: { type: String },
  job: { type: String },
  aboutMe: { type: String },
  interests: [{ type: String }],
  offers: [{ type: String }],
  activities: [{ type: String }],
  organizing: [{ type: String }],
});

const UserModell = model("User", userSchema, "users");
export default UserModell;
