import { model, Schema, Types } from 'mongoose';
import { IUserModel } from './user.types';

const userSchema = new Schema<IUserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: null },
    birthDay: { type: String, default: null },
    phone: { type: String, default: null },
    roles: {
      type: [String],
      enum: ['USER', 'ADMIN'],
      default: ['USER'],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUserModel>('User', userSchema);
export { UserModel };
