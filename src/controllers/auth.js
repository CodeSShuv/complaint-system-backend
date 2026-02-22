import bcrypt from "bcryptjs";
import crypto from "crypto";
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
  let isMailSent = await senderEmail(email, "Email Verification", verificationEmailTemplate(newUser, verificationLink), firstName + " " + lastName);
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
  user.verificationToken = undefined;
  await user.save();

  return res.json({ msg: "Email verified successfully. You can now log in." });
}
export const changePassword = async (req, res) => {

  const userId = req.user.user.userId;
  console.log(req.body);
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  await user.save();

  res.json({ msg: "Password changed successfully" });

};



export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }
  let newPassword = crypto.randomBytes(4).toString("hex")
  let hashedPassword = await hash(newPassword, 12)
  let emailToken = generateToken({ email: email }, "1h");
  let verificationLink = `http://localhost:5173/verify-email/${emailToken}`;

  user.password = hashedPassword;


  await user.save();
  let isMailSent = await senderEmail(user.email, "Reset Password", `<p>Your password has been successfully reset. Your new password is:</p>

<h2 style="background-color: #f3f4f6; padding: 10px 15px; display: inline-block; border-radius: 6px; font-family: monospace;">
  ${newPassword}
</h2>

<p>Please <strong>log in using this password</strong> and make sure to change it after logging in for security purposes.</p>

<p style="margin-top: 20px;">If you did not request this password change, please contact support immediately.</p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

<p style="font-size: 12px; color: #6b7280;">
  This is an automated message from your CMS. Please do not reply to this email.
</p>`);
  if (!isMailSent) {
    throw AppError("Failed to send  email. Please try again later.", 500);
  }

  return res.json({ msg: "Password Reset. Please check your mail" });
}