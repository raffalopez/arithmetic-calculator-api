import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

interface IPayload {
  sub: string;
  email: string;
}
const generateToken = (payload: IPayload) => {
  const expiresIn = 60 * 15 * 24;

  try {
    const token = jwt.sign(payload, config.secretKey, { expiresIn });
    return { token, expiresIn };
  } catch (error: any) {
    return boom.notFound(error);
  }
};

const generateRefreshToken = (payload: IPayload) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign(payload, config.secretRefreshToken, {
      expiresIn,
    });
    return {
      refreshToken,
      expires: new Date(Date.now() + expiresIn * 1000),
    };
  } catch (error: any) {
    return boom.notFound(error);
  }
};

export { generateToken, generateRefreshToken };
