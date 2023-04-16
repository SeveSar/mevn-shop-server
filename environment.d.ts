declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DB_URL: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      SESSION_SECRET: string;
      PORT: number;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
