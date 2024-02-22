import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 5000,
  dbUser: process.env.DB_USER || 'admin',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'postgres',
  dbPort: process.env.DB_PORT || '5432',
  secretKey: process.env.SECRET_KEY || '',
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN || '',
  apiKeyRandom:
    process.env.API_KEY_RANDOM_ORG ||
    'b7b1ed7777396b76c5d5f49315a12ab82db4ac34a0fdce9231f92913c50724d6',
};
export default config;
