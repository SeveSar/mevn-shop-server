import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ITokenPayload } from "../api/user/user.types";

export interface CustomRequest extends Request {
  user: ITokenPayload;
}
