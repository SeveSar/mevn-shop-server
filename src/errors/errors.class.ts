import { Result, ValidationError } from 'express-validator';
export class ErrorHTTP extends Error {
  status: number;
  errors?: ValidationError[];
  constructor(status: number, message: string, errors?: Result<ValidationError>) {
    super(message);
    this.status = status;
    this.errors = errors?.array();
  }
}
