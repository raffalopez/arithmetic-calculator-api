import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import boom from '@hapi/boom';

import AuthService from '../services/auth.service';
import validatorHandler from '../middleware/validator.handler';
import { login } from '../schemas/auth.schema';
import { authRefreshToken } from '../middleware/auth';
import config from '../config/config';
import UserService from '../services/user.service';

const service = new AuthService();
const userService = new UserService();

const router = express.Router();
interface Error {
  name: string;
  message: string;
  stack?: string;
}

router.post(
  '/login',
  validatorHandler(login, 'body'),
  passport.authenticate('local', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token, refreshToken } = service.signToken(req.user);
      res.json({
        user,
        token,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/refresh',
  authRefreshToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken: string =
        req?.headers?.authorization?.split(' ').pop() || '';

      if (!refreshToken) {
        next(boom.unauthorized());
      }

      const userData: any = service.verify(
        refreshToken,
        config.secretRefreshToken,
      );
      const user = await userService.findByEmail(userData?.email);

      const { token } = service.signToken(userData);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(boom.unauthorized(error as Error));
    }
  },
);

export default router;
