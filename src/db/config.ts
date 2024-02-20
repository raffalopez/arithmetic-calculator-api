import config from '../config/config';

const USER: string = encodeURIComponent(config.dbUser);
const PASSWORD: string = encodeURIComponent(config.dbPassword);

const URI: string = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

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
