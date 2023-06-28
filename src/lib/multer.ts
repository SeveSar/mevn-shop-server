import { ErrorHTTP } from '../errors/errors.class';
import multer from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storageConfig = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, path.join(__dirname, '..', 'uploads/products'));
  },
  filename(req: Request, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, uuidv4() + extension);
  },
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    const err = new ErrorHTTP(400, 'Разрешены только следующие форматы: jpg, png, jpeg');
    err.name = 'ExtensionError';
    return cb(err);
  }
};

export { storageConfig, multer, fileFilter };
