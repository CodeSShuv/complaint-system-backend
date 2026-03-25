import mongoose, { Schema, model } from "mongoose";

let ComplainSchema = new Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User", required: false
    },
    deptId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },
    subject: String,
    body: String,
    message: String,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);
export const Complain = model("Complain", ComplainSchema);
