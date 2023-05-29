import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  tokenAddress: {
    type: String,
    required: true,
  },
  tokenName: {
    type: String,
    required: true,
  },

  tokenSymbol: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Token", tokenSchema);
