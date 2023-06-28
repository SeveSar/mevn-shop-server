import { Request } from 'express';
import { ITokenPayload } from '../api/user/user.types';

export interface ICustomRequest extends Request {
  user: ITokenPayload;
}
