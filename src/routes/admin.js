import { Router } from "express";
import { getAllUsers, getAllUnverifiedUsers, updateComplaintStatus, createAdmin, deleteUser } from "../controllers/admin.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
import authorize from "../middlewares/authorize.js";

const adminRouter = Router();

adminRouter.get("/get-users", loggedInUserOnly, authorize(["Admin", "Super Admin"]), useAsync(getAllUsers));
// adminRouter.get("/unverified-users", loggedInUserOnly, authorize(["Admin"]), useAsync(getAllUnverifiedUsers));
adminRouter.put("/update-status/:complaintId", loggedInUserOnly, authorize(["Super Admin", "Admin"]), useAsync(updateComplaintStatus));
adminRouter.post("/create-admin", loggedInUserOnly, authorize(["Super Admin"]), useAsync(createAdmin));
adminRouter.delete("/delete-user/:userId", loggedInUserOnly, authorize(["Super Admin"]), useAsync(deleteUser));

export default adminRouter;