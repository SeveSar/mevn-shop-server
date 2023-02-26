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
  id: string;
}

interface IUserModel extends IUser {
  _id: string;
  password: string;
}
interface ITokenPayload {
  email: string;
  id: string;
  roles: TypeRole[];
}

export { TypeRole, IUserDTO, IUserModel, ITokenPayload };
