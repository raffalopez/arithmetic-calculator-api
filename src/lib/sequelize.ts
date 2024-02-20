import { Sequelize } from 'sequelize';

import config from '../config/config';
import { setupModels } from '../db/models/index';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const ENVIRONMENT: string = config.env;

let URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
URI = ENVIRONMENT === 'production' ? `${URI}?sslmode=require`: URI;

const sequelize = new Sequelize(URI, { dialect: 'postgres', logging: true });

setupModels(sequelize);
sequelize.sync();

const models = sequelize.models;

export { models, sequelize };
