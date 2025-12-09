import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(() => {
      console.log("Couldn't connect to mongodb");
    });
};
