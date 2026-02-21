import express from "express";
import handleGetComplaints, {
  handleFetchAllComplaints,
  handleGetComplaintCount,
  handleFetchComplaint,
  handleDeleteComplaint
} from "../controllers/complain.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
import authorize from "../middlewares/authorize.js";
const complainRouter = express.Router();
complainRouter
  .post("/", loggedInUserOnly, useAsync(handleGetComplaints))

  .get("/counts", loggedInUserOnly, useAsync(handleGetComplaintCount))

  .get("/all", loggedInUserOnly, useAsync(handleFetchAllComplaints))
  .get('/:complaintId', loggedInUserOnly, useAsync(handleFetchComplaint))
  .delete("/:complaintId", loggedInUserOnly, authorize(["Student"]), useAsync(handleDeleteComplaint));

export default complainRouter;
