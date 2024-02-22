import boom from '@hapi/boom';
import { models, sequelize } from '../lib/sequelize';
import UserService from './user.service';
import RecordService from '../services/record.service';
import { arithmeticFn } from '../utils/arithmetic/index';
import { IOperation } from '../interfaces/operation';
import { logger } from '../lib/logger';

const recordService = new RecordService();
const userService = new UserService();

class OperationsService {
  constructor() {}

  async find(query: any) {
    const options: any = {
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { type } = query;
    if (type) {
      options.where.type = type;
    }

    const operations = await models.Operation.findAll(options);
    return operations;
  }

  async create(data: any) {
    const operation = await models.Operation.create(data);
    return operation;
  }

  async findOne(id: string) {
    const record = await models.Record.findByPk(id);
    if (!record) {
      throw boom.notFound('record not found');
    }
    return record;
  }

  async findOneOperation(id: string) {
    const record = await models.Operation.findByPk(id);
    if (!record) {
      throw boom.notFound('operation not found');
    }
    return record;
  }

  async delete(id: string) {
    const operation = await this.findOneOperation(id);
    await operation.destroy();
    return { id };
  }

  async addOperation(
    type: any,
    numberA: string,
    numberB: string,
    cost: number,
    userId: string,
  ) {
    const operationResult: string | number | null = await arithmeticFn({
      type,
      numberA: parseInt(numberA),
      numberB: parseInt(numberB),
    });
    logger.info(`Operation ${type} for user ${userId}`);
    try {
      const result = await sequelize.transaction(async () => {
        const records = await recordService.findByUser(userId);
        const user = await userService.findOne(userId);

        const operation: IOperation = {
          type,
          cost,
          userId,
          recordId: records?.dataValues.id,
          operationResponse: operationResult,
        };

        if (user.dataValues.amount < cost) {
          throw boom.badRequest(
            'Insufficient balance to perform this operation',
          );
        }
        await userService.update(userId, {
          amount: user.dataValues.amount - cost,
        });
        const newOperation: any = await this.create(operation);
        return newOperation;
      });

      return result;
    } catch (error) {
      logger.error(`peration failed ${JSON.stringify(error)}`);
      throw boom.internal('Operation failed: ' + error);
    }
  }
}
export default OperationsService;
