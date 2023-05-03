// src/types/express/index.d.ts
import { SessionData } from "express-session";
import { ITokenPayload } from "./src/api/user/user.types";
import { Request } from "express";
// to make the file a module and avoid the TypeScript error
export {};

declare module "express-session" {
  interface SessionData {
    username: string;
    cart: string[];
  }
}

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
// declare global {
//   namespace Express {
//     interface Request {
//       user?: ITokenPayload;
//       session: { username?: string };
//     }
//   }
// }
declare module "express" {
  export interface Request {
    user: any;
  }
}
