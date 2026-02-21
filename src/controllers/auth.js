import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import { User } from "../models/User.js";
import { generateToken } from "../../utils/tokenHelper.js";
import senderEmail from "../../utils/emailVerification.js";
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

  let hashedPassword = await hash(password, 12);
  //creating a new user
  let emailToken = generateToken({ email: email }, "1h");
  let verificationLink = `http://localhost:5173/verify-email/${emailToken}`;

  const newUser = new User({
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: hashedPassword,
    verificationToken: emailToken
  });

  await newUser.save();
  let isMailSent = await senderEmail(email, "Email Verification", verificationLink, firstName + " " + lastName);
  if (!isMailSent) {
    throw AppError("Failed to send verification email. Please try again later.", 500);
  }

  return res.json({ msg: "User Registered Successfully. Please verify your email." });
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
    role: user.role,
    isVerified: user.isVerified

  };
  let token = generateToken(payload);

  res.cookie("token", token);
  return res.json({
    data: {
      userId: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    },
  });
};

export const handleCookieLogin = (req, res) => {
  if (!req.user.user) return res.status(401).json({ msg: "Please Login" });

  return res.json({ data: req.user.user });
};

export const handleEmailVerification = async (req, res) => {
  const { token } = req.params;
  let user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw AppError("Invalid or expired verification token", 400);
  }

  user.isVerified = true;
  user.verificationToken = undefined; // Clear the token after verification
  await user.save();

  return res.json({ msg: "Email verified successfully. You can now log in." });
}
