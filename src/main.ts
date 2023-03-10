import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectToMongoDB } from "./database/mongo";
import { loggerService } from "./logger";

import { router } from "./routes";
import { json } from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middleware/error.middleware";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(express.static(path.join(__dirname, "uploads/products")));
app.use(express.static(path.join(__dirname, "uploads/users")));
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectToMongoDB();

    app.listen(PORT, () => {
      loggerService.log(`Server has started on port: ${PORT}`);
    });
  } catch (e) {
    loggerService.err(e);
  }
};

start();
