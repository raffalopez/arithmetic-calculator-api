import express, { NextFunction, Request, Response } from 'express';

import { auth } from '../middleware/auth';
import RecordService from '../services/record.service';
import validatorHandler from '../middleware/validator.handler';
import { getRecordSchema, queryRecordSchema } from '../schemas/record.schema';

const router = express.Router();
const service = new RecordService();

router.get(
  '/',
  auth,
  validatorHandler(queryRecordSchema, 'query'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const record = await service.find(req?.query);
      res.json(record);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  auth,
  validatorHandler(getRecordSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const record = await service.findOne(id);
      res.json(record);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
