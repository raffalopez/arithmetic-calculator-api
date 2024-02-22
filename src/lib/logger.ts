import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    //new winston.transports.File({ filename: 'application.log' }),
  ],
});

export { logger };
