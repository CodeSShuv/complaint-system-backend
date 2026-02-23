import { Router } from "express";
import { body } from "express-validator";
import { User } from "../models/User.js";
import { getAllUsers, getAllUnverifiedUsers, updateComplaintStatus, createAdmin, deleteUser, getStats } from "../controllers/admin.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
import authorize from "../middlewares/authorize.js";

const adminRouter = Router();

adminRouter.get("/get-users", loggedInUserOnly, authorize(["Admin", "Super Admin"]), useAsync(getAllUsers));
// adminRouter.get("/unverified-users", loggedInUserOnly, authorize(["Admin"]), useAsync(getAllUnverifiedUsers));
adminRouter.put("/update-status/:complaintId", loggedInUserOnly, authorize(["Super Admin", "Admin"]), useAsync(updateComplaintStatus));
adminRouter.post("/create-admin", loggedInUserOnly, authorize(["Super Admin"]), [
  body("email")
    .isEmail()
    .withMessage("invalid Email format")
    .custom((value) => {
      if (!value.endsWith("@mbmc.edu.np")) {
        throw new Error("Only MBMC college email allowed");
      }
      return true;
    })
    .custom(async (value) => {
      let existingEmail = User.findOne({ email: value });
      console.log(existingEmail);
      if (!existingEmail) {
        throw new Error("Email Already Register");
      }
      return true;
    })
], useAsync(createAdmin));
adminRouter.delete("/delete-user/:userId", loggedInUserOnly, authorize(["Super Admin", "Admin"]), useAsync(deleteUser));

adminRouter.get("/get-stats", loggedInUserOnly, authorize(["Admin", "Super Admin"]), useAsync(getStats));

export default adminRouter;