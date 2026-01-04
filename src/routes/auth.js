import express from "express";
import { body } from "express-validator";
import {
  handleUserRegister,
  handleUserLogin,
  handleCookieLogin,
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
      .custom(async (value) => {
        let existingEmail = User.findOne({ email: value });
        if (!existingEmail) {
          throw new Error("Email Already Register");
        }
        return true;
      }),
  ],
  handleUserRegister
);
authRouter.get("/user", loggedInUserOnly, useAsync(handleCookieLogin));

export default authRouter;
