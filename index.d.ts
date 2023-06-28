// src/types/express/index.d.ts
import { SessionData } from 'express-session';
import { ITokenPayload } from './src/api/user/user.types';
import { Request } from 'express';

// to make the file a module and avoid the TypeScript error
export {};

declare module 'express-session' {
  interface SessionData {
    username: string;
    cart: string[];
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user: ITokenPayload;
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: ITokenPayload;
//     }
//   }
// }
