import express from "express";
import { body } from "express-validator";
import {
  handleUserRegister,
  handleUserLogin,
  handleCookieLogin,
  handleEmailVerification,
  changePassword,
  forgotPassword
} from "../controllers/auth.js";
import { User } from "../models/User.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
const authRouter = express.Router();
authRouter.post(
  "/login",
  [body("email").isEmail().withMessage("Invalid Email Format")],
  useAsync(handleUserLogin)
);

authRouter.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("invalid Email format")
      .custom((value) => {
        if (!value.endsWith("@mbmc.edu.np")) {
          throw new Error("Only MBMC college email allowed");
        }
        return true;
      })
      .custom(async (value) => {
        let existingEmail = User.findOne({ email: value });
        if (!existingEmail) {
          throw new Error("Email Already Register");
        }
        return true;
      })
  ],
  handleUserRegister
)
  .get("/verify/:token", useAsync(handleEmailVerification));
authRouter.get("/user", loggedInUserOnly, useAsync(handleCookieLogin))
  .put("/change-password", loggedInUserOnly, changePassword)
  .post("/forgot-password", useAsync(forgotPassword));

export default authRouter;
