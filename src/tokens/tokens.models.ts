import { model, Schema, Types } from "mongoose";
const tokenSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const RefreshTokenModel = model("RefreshToken", tokenSchema);

export { RefreshTokenModel };
