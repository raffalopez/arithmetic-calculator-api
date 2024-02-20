import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from './user.service';
import {
  generateRefreshToken,
  generateToken,
} from '../utils/generateToken/tokenManager';

const service: UserService = new UserService();
class AuthService {
  async getUser(email: string, password: string) {
    const user: any = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const verifyIsMatch = await bcrypt.compare(password, user.password);
    if (!verifyIsMatch) {
      throw boom.unauthorized();
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

  verify(token: string, secret: string) {
    return jwt.verify(token, secret);
  }
}

export default AuthService;
