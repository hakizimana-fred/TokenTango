import mongoose from "mongoose";

export const connectDB = () => {
  try {
    //mongoose.connect('mongodb://localhost')
  } catch (e) {
    process.exit(1);
  }
};
