import app from "./src/app.js";
import dotenv from "dotenv";
import { connectToDb } from "./connectToDb.js";
dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
  connectToDb();
});
