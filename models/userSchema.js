import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  address: [
    {
      zip: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: String, required: true },
    },
  ],
  geoCode: [String], //* neu hinzugefügt!!!
  gender: { type: String },
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  followUsers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  groups: [
    {
      type: Schema.Types.ObjectId, //das ist die ID
      ref: "groups",
    },
  ],
  marketItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "markets",
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
  offers: [{ type: String }], // Was ich anbiete
  activities: [{ type: String }],
  organizing: [{ type: String }],
});

const UserModell = model("users", userSchema);
export default UserModell;
