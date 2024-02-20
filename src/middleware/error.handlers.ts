import { NextFunction, Response, Request } from 'express';
import { ValidationError } from 'sequelize';

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  next(err);
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err: any, req: Request, res: Response, next: any) {
  console.log(err);

  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function ormErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

export { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
