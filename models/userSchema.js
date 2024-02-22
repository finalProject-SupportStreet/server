import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String },
  address: [
    {
      plz: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String, required: true },
    },
  ],
  gender: { type: String },
  blockedUsers: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  followUsers: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  groups: [
    {
      groupName: { type: String },
      groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    },
  ],
  interests: [{ type: String }],
  birthday: { type: Date },
  since: { type: Date },
  comeFrom: { type: String },
  familyStatus: { type: String },
  children: { type: Boolean },
  pet: { type: String },
  job: { type: String },
  aboutMe: { type: String },
  offers: [{ type: String }],
  activities: [{ type: String }],
  organizing: [{ type: String }],
});

const UserModell = model("User", userSchema, "users");
export default UserModell;
