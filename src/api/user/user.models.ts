import { model, Schema, Types } from "mongoose";
import { IUser, TypeRole } from "./user.types";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: null },
    birthDay: { type: String, default: null },
    phone: { type: String, default: null },
    roles: [{ type: String, default: "USER" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", userSchema);
export { UserModel };
