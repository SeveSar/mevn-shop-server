// src/types/express/index.d.ts

import { ITokenPayload } from "./src/api/user/user.types";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user: ITokenPayload;
    }
  }
}
