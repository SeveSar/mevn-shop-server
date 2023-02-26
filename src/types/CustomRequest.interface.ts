import { Request } from "express";
import { ITokenPayload } from "../api/user/user.types";

export interface CustomRequest extends Request {
  user: ITokenPayload;
}
