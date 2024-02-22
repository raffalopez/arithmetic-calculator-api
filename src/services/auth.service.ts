import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from './user.service';
import {
  generateRefreshToken,
  generateToken,
} from '../utils/generateToken/tokenManager';
import config from '../config/config';
import { sequelize } from '../lib/sequelize';
import { logger } from '../lib/logger';

const service: UserService = new UserService();
class AuthService {
  async getUser(email: string, password: string) {
    const user: any = await service.findByEmail(email);
    if (!user) {
      logger.error(`User not found ${email}`);
      throw boom.unauthorized(`Wrong username or password`);
    }
    const verifyIsMatch = await bcrypt.compare(password, user.password);
    if (!verifyIsMatch) {
      logger.error(`Wrong password ${email}`);
      throw boom.unauthorized(`Wrong username or password`);
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return {
      user,
      token,
      refreshToken,
    };
  }

  async refreshUserToken(refreshToken: string) {
    try {
      const { user, token } = await sequelize.transaction(async () => {
        const userData: any = this.verify(
          refreshToken,
          config.secretRefreshToken,
        );
        const user = await service.findByEmail(userData?.email);

        const { token } = this.signToken(userData);
        logger.info(`Sign completed for user ${userData?.email}`);
        return {
          user,
          token,
        };
      });

      return {
        user,
        token,
      };
    } catch (error) {
      logger.error(`Refresh Token failed ${JSON.stringify(error)}`);
      throw boom.internal('Refresh Token failed: ' + error);
    }
  }

  verify(token: string, secret: string) {
    return jwt.verify(token, secret);
  }
}

export default AuthService;
