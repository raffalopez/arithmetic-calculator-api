import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middleware/auth';
import OperationsService from '../services/operations.service';
import validatorHandler from '../middleware/validator.handler';
import {
  createOperationSchema,
  getOperationSchema,
  queryOperationSchema,
} from '../schemas/operation.schema';

const router = express.Router();
const service = new OperationsService();

router.get(
  '/',
  auth,
  validatorHandler(queryOperationSchema, 'query'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const operations = await service.find(req?.query);
      res.json(operations);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  auth,
  validatorHandler(createOperationSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type, numberA, numberB, cost } = req.body;
      const userId: string = req?.user as string;

      const newOperation: any = await service.addOperation(
        type,
        numberA,
        numberB,
        cost,
        userId,
      );

      res.status(201).json(newOperation);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  auth,
  validatorHandler(getOperationSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const operation = await service.findOne(id);
      res.json(operation);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  auth,
  validatorHandler(getOperationSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const operation = await service.delete(id);
      res.json(operation);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
