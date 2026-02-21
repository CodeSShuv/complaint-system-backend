import app from "./src/app.js";
import dotenv from "dotenv";
import { connectToDb } from "./connectToDb.js";
dotenv.config();
app.listen(8080, () => {
  console.log(`Listening on http://localhost:8080`);
  connectToDb();
});
