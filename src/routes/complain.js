import express from "express";
import handleGetComplain, {
  handleFetchAllComplains,
  handleGetComplainCount,
} from "../controllers/complain.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
const complainRouter = express.Router();
complainRouter
  .post("/", loggedInUserOnly, useAsync(handleGetComplain))

  .get("/count", loggedInUserOnly, useAsync(handleGetComplainCount))

  .get("/all", loggedInUserOnly, useAsync(handleFetchAllComplains))

  .get("/:complainId", loggedInUserOnly);
export default complainRouter;
