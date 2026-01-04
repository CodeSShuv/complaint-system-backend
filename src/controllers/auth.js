import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import { User } from "../models/User.js";
import { generateToken } from "../../utils/tokenHelper.js";

import { validationResult } from "express-validator";
import AppError from "../../utils/AppError.js";
export const handleUserRegister = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw AppError(errors.array(), 401);
  }
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  //to check weather password is properly confirmed or not
  if (password != confirmPassword) {
    throw AppError("Please confirm the correct password", 401);
  }

  let hashedPassword = await hash(password, 4);
  //creating a new user
  const newUser = new User({
    firstname: firstName,
    lastname: lastName,
    email: email,

    password: hashedPassword,
  });
  await newUser.save();
};

//login controller
export const handleUserLogin = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });

  if (!user) throw new AppError("User not found");

  let isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid Username or Password", 401);
  }
  let payload = {
    userId: user.id,
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
  };
  let token = generateToken(payload);

  res.cookie("token", token);
  return res.json({
    data: {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
    },
  });
};

export const handleCookieLogin = (req, res) => {
  if (!req.user) return res.status(401).json({ msg: "Please Login" });

  return res.json({ data: req.user });
};
