import { Router } from "express";
import { getAllUsers, getAllUnverifiedUsers } from "../controllers/admin.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
import authorize from "../middlewares/authorize.js";

const adminRouter = Router();

adminRouter.get("/get-users", loggedInUserOnly, authorize(["Admin"]), useAsync(getAllUsers));
adminRouter.get("/unverified-users", loggedInUserOnly, authorize(["Admin"]), useAsync(getAllUnverifiedUsers));

export default adminRouter;