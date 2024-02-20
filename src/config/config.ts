import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || '',
  dbName: process.env.DB_NAME || '',
  dbPort: process.env.DB_PORT || '',
  apiKey: process.env.API_KEY || '',
  secretKey: process.env.SECRET_KEY || '',
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN || '',
  apiKeyRandom: process.env.API_KEY_RANDOM_ORG || '',
};
export default config;
