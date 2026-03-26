import { Schema, model } from "mongoose";

let userSchema = new Schema({
  firstname: String,
  lastname: String,

  email: {
    type: String,
    unique: true,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Super Admin", "Student", "Admin"],
    required: true,
    default: "Student"
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
      return this.role === "student" ? "pending" : "approved";
    }},
    deptId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
     
    }
  
});

export const User = model("User", userSchema);
