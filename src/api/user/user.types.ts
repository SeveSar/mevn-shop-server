type TypeRole = "USER" | "ADMIN";

interface IUser {
  _id: string;
  name?: string;
  email: string;
  avatar?: string;
  password: string;
  birthDay?: string;
  phone?: string;
  roles: TypeRole[];
}
interface IUserDTO {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  birthDay?: string;
  phone?: string;
  roles: TypeRole[];
}

interface ITokenPayload {
  email: string;
  id: string;
  roles: TypeRole[];
}

export { IUser, TypeRole, IUserDTO, ITokenPayload };
