import { decodeToken } from "../../utils/tokenHelper.js";

export const loggedInUserOnly = (req, res, next) => {
  try {
    console.log(req.cookies.token);
    if (!req.cookies.token) {
      res.status(401).json({ msg: "Please Login" });
    }
    const user = decodeToken(req.cookies.token);
    if (!user) {
      res.status(401).json({ msg: "Invalid Token" });
    }
    console.log(user);
    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
