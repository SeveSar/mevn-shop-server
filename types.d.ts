// src/types/express/index.d.ts
import { SessionData } from 'express-session';
import { ITokenPayload } from './src/api/user/user.types';
import { Request } from 'express';

// to make the file a module and avoid the TypeScript error

declare global {
  namespace Express {
    export interface Request {
      user: ITokenPayload;
    }
  }
}
