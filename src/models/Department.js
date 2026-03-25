import mongoose from "mongoose";
import { Schema, model } from "mongoose";

let DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Department = model("Department", DepartmentSchema);