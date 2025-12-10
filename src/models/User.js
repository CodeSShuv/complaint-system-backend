import { Schema, model } from "mongoose";

let userSchema = new Schema({
  firstname: String,
  lastname: String,
  org_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student"],
    required: true,
  },
});

export const User = model("User", userSchema);
