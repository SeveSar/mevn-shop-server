import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { get as getEnv } from 'env-var';
import path from 'path';
import { json } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectToMongoDB } from '../database/mongo';
import { loggerService } from '../logger';
import { router } from './routes';
import { errorMiddleware } from '../middleware/error.middleware';

const app = express();
const PORT = getEnv('PORT').required().asIntPositive();
const whitelist = ["http://localhost:3000", "http://localhost:5050", 'https://mevn-shop-client-rho.vercel.app'];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Разрешаем запросы с указанных доменов
    } else {
      callback(new Error("Not allowed by CORS")); // Отклоняем запрос
    }
  },
  credentials: true, // Разрешаем отправку куков
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Разрешенные методы
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
  ],
};
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, 'images')));
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use((req, res, next) => {
  loggerService.log(`IP: ${req.ip}`, `Method: ${req.method}`, `URL: ${req.path}`);
  next();
});

app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      loggerService.log(`Server has started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e)
    loggerService.err(e);
  }
};

start();
