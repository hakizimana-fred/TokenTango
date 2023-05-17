import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  token: String,
});

export default mongoose.model("Token", tokenSchema);
