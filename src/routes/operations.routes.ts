import express, { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { auth } from '../middleware/auth';
import OperationsService from '../services/operations.service';
import { arithmeticFn } from '../utils/arithmetic/index';
import RecordService from '../services/record.service';
import validatorHandler from '../middleware/validator.handler';
import {
  createOperationSchema,
  getOperationSchema,
  queryOperationSchema,
} from '../schemas/operation.schema';
import UserService from '../services/user.service';

const router = express.Router();
const service = new OperationsService();
const recordService = new RecordService();
const userService = new UserService();

export interface IRecord {
  operationId: string;
  userId: string;
  amount: number;
  userBalance: number;
  operationResponse: number;
  date: Date;
}

export interface IOperation {
  recordId: string;
  userId: string;
  type: string;
  operationResponse: string | number | null;
  cost: number;
}

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

      const result: string | number | null = await arithmeticFn({
        type,
        numberA: parseInt(numberA),
        numberB: parseInt(numberB),
      });
      const records = await recordService.findByUser(userId);
      const user = await userService.findOne(userId);

      const operation: IOperation = {
        type,
        cost,
        userId,
        recordId: records?.dataValues.id,
        operationResponse: result,
      };

      if (user.dataValues.amount < cost) {
        throw boom.badRequest('Insufficient balance to perform this operation');
      }
      await userService.update(userId, {
        amount: user.dataValues.amount - cost,
      });
      const newOperation: any = await service.create(operation);

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
