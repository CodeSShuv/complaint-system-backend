import { Router } from "express";
import { body } from "express-validator";
import { addDepartment, fetchDepartments } from "../controllers/department.js";
import { loggedInUserOnly } from "../middlewares/loggedInUserOnly.js";
import useAsync from "../../utils/useAsync.js";
import authorize from "../middlewares/authorize.js";

const departmentRouter = Router();
departmentRouter.get("/fetch", loggedInUserOnly, authorize(["Admin", "Super Admin"]), useAsync(fetchDepartments))
  .post("/add", loggedInUserOnly, authorize("Super Admin"), [body('name')
    .isString("Department name must be a string")
    .isEmpty("Department name is required")

  ],
    useAsync(addDepartment)
  )
export { departmentRouter };