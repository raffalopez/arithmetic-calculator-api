import express, { NextFunction, Request, Response } from 'express';

import UserService from '../services/user.service';
import validatorHandler from '../middleware/validator.handler';
import {
  createUserSchema,
  getUserSchema,
  queryUserSchema,
  updateAmount,
} from '../schemas/user.schema';

const router = express.Router();
const service = new UserService();

router.get(
  '/',
  validatorHandler(queryUserSchema, 'query'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await service.find(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateAmount, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
