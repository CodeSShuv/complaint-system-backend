import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/cms")
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(() => {
      console.log("Couldn't connect to mongodb");
    });
};
