import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

type Property = 'params' | 'body' | 'query';

function validatorHandler(schema: Schema, property: Property) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export default validatorHandler;
