import { User } from "../models/User.js";
import { Complain } from "../models/Complain.js";
import { Department } from "../models/Department.js";
import AppError from "../../utils/AppError.js";
import { validationResult } from "express-validator";
export const fetchDepartments = async (req, res) => {

  const departments = await Department.find();
  if (!departments) {
    throw new AppError("No departments found", 404);
  }
  res.json({
    success: true,
    data: departments
  });
};
export const addDepartment = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw AppError(errors.array()[0].msg, 401);
  }
  const name = req.body.depName?.toUpperCase();
  if (!name) {
    throw new AppError("Department name is required", 400);
  }
  const existingDepartment = await Department.findOne({ name });
  if (existingDepartment) {
    
    throw new AppError("Department already exists", 400);
  }
  const department = await Department.create({ name });
  res.json({
    msg:"Department Created",
    success: true,
    data: department
  });
};