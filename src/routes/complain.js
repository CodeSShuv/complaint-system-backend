import express from "express";
import handleGetComplain, {
  handleGetComplainCount,
} from "../controllers/complain.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
const complainRouter = express.Router();
complainRouter
  .get("/", (req, res) => {})
  .post("/", loggedInUserOnly, handleGetComplain)
  .get("/count", loggedInUserOnly, handleGetComplainCount);
export default complainRouter;
