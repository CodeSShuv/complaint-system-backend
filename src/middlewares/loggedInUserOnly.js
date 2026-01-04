import AppError from "../../utils/AppError.js";
import { decodeToken } from "../../utils/tokenHelper.js";

export const loggedInUserOnly = (req, res, next) => {
  if (!req.cookies.token) {
    throw new AppError("Please Login", 401);
  }
  const user = decodeToken(req.cookies.token);

  if (!user) {
    throw new AppError("Invalid Token", 401);
  }

  req.user = user;
  next();
};
