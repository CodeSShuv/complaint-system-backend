import express from "express";
import handleGetComplain, {
  handleFetchAllComplains,
  handleGetComplainCount,
} from "../controllers/complain.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
const complainRouter = express.Router();
complainRouter
  .post("/", loggedInUserOnly, handleGetComplain)
  .get("/count", loggedInUserOnly, handleGetComplainCount)
  .get("/all", loggedInUserOnly, handleFetchAllComplains);
export default complainRouter;
