import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// ===Routers
import authRouter from "./routes/auth.js";

import complainRouter from "./routes/complain.js";
import handleError from "./middlewares/errorHandler.js";
import adminRouter from "./routes/admin.js";
const app = express();
app.use(
  cors(
    {
      origin: "http://localhost:5173", // your frontend
      credentials: true, // MUST be true to receive cookies
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/complaint", complainRouter);
app.use("/admin", adminRouter);
app.use(handleError);

export default app;
