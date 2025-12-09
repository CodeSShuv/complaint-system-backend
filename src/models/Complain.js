import mongoose, { Schema, model } from "mongoose";

let ComplainSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: false },
  category: String,
  subject: String,
  body: String,
});
export const Complain = model("Complain", ComplainSchema);
