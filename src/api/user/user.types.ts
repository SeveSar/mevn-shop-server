import { IIngredient, IIngredientModel, ISize } from './../product/product.types';
import { Types } from 'mongoose';
import { IDough, ISizeModel } from '../product/product.types';
import { IDoughModel } from '../product/product.types';

type TypeRole = 'USER' | 'ADMIN';

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  birthDay: string;
  phone: string;
  roles: TypeRole[];
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
  email: IUser['email'];
  password: IUserModel['password'];
  cart?: {
    id: string;
    dough: IDough & { id: string };
    quantity: number;
    price: number;
    size: ISize & { id: string };
    ingredients: (IIngredient & { id: string })[];
  }[];
}

export type UserUpdateRequest = Omit<IUser, 'roles'> & { password: IUserModel['password'] };

export { TypeRole, IUserModel, ITokenPayload };
