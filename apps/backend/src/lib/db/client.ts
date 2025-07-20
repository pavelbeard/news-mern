import mongoose from "mongoose";
import { MONGODB_URL } from "../constants";

export const client = async (connstring?: string) => {
  const mongoUrl = connstring ? connstring : MONGODB_URL;

  if (mongoUrl === undefined || mongoUrl === "") {
    throw new Error("MongoDB connection string is not provided.");
  }

  return await mongoose.connect(mongoUrl);
};
