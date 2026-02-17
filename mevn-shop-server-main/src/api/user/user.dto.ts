import { Types } from 'mongoose';
import { IUserModel, TypeRole } from './user.types';

export class UserDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  birthDay: string;
  phone: string;
  roles: TypeRole[];

  constructor(model: IUserModel) {
    this._id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.avatar = model.avatar;
    this.birthDay = model.birthDay;
    this.phone = model.phone;
    this.roles = model.roles;
  }
}
