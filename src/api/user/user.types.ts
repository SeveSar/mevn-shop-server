import { Types } from "mongoose";
import { IDough, ISize } from "../product/product.types";

type TypeRole = "USER" | "ADMIN";

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  birthDay: string;
  phone: string;
  roles: TypeRole[];
}
interface IUserDTO extends IUser {
  id: Types.ObjectId;
}

interface IUserModel extends IUser {
  _id: Types.ObjectId;
  password: string;
}
interface ITokenPayload {
  email: string;
  id: Types.ObjectId;
  roles: TypeRole[];
}

export interface ILoginRequest {
  email: string;
  password: string;
  cart?: { id: string; dough: IDough; quantity: number; price: number; size: ISize; ingredients: string[] }[];
}

export { TypeRole, IUserDTO, IUserModel, ITokenPayload };
