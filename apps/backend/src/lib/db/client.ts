import mongoose from "mongoose";
import { MONGODB_URL } from "../constants";

export const client = async (connstring?: string) => {
  return await mongoose.connect(connstring ? connstring : MONGODB_URL);
};
