import { decodeToken } from "../../utils/tokenHelper.js";

export const loggedInUserOnly = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ msg: "Please Login" });
    }
    const user = decodeToken(req.cookies.token);

    if (!user) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
