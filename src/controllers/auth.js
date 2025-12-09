import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import { User } from "../models/User.js";
import { generateToken } from "../../utils/tokenHelper.js";

import { validationResult } from "express-validator";
export const handleUserRegister = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    //to check weather password is properly confirmed or not
    if (password != confirmPassword) {
      res.status(400).json({ msg: "Please confirm the correct password" });
      return;
    }
    // console.log(req.body);
    let hashedPassword = await hash(password, 4);
    //creating a new user
    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email: email,

      password: hashedPassword,
    });
    await newUser.save();
  } catch {
    //any server related problems
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//login controller
export const handleUserLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    console.log(password, user);
    if (!user) return res.status(404).json({ msg: "User not found" });
    console.log("working");
    let isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    let payload = {
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
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: e,
    });
  }
};

export const handleCookieLogin = (req, res) => {
  if (!req.user) return res.status(401).json({ msg: "Please Login" });

  return res.json({ data: req.user });
};
