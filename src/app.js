import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// ===Routers
import authRouter from "./routes/auth.js";
import { loggedInUserOnly } from "./middlewares/loggedInUserOnly.js";
import complainRouter from "./routes/complain.js";
import handleError from "./middlewares/errorHandler.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // MUST be true to receive cookies
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/complain", complainRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(handleError);

export default app;
