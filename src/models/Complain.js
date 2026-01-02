import mongoose, { Schema, model } from "mongoose";

let ComplainSchema = new Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: false },
    category: String,
    subject: String,
    body: String,
    message: String,
    status: {
      type: String,
      enum: ["Pending", "Active", "Fulfilled"],
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);
export const Complain = model("Complain", ComplainSchema);
