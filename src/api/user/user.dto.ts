import { IUser, IUserDTO, TypeRole } from "./user.types";

export class UserDTO implements IUserDTO {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  birthDay?: string;
  phone?: string;
  roles: TypeRole[];

  constructor(model: IUser) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.avatar = model.avatar;
    this.birthDay = model.birthDay;
    this.phone = model.phone;
    this.roles = model.roles;
  }
}
