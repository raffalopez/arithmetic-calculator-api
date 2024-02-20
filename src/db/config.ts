import config from '../config/config';

const USER: string = encodeURIComponent(config.dbUser);
const PASSWORD: string = encodeURIComponent(config.dbPassword);
const ENVIRONMENT: string = config.env;

let URI: string = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
URI = ENVIRONMENT === 'production' ? `${URI}?sslmode=require`: URI;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
