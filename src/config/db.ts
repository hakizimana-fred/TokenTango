import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("DB connected successfully");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
