import boom from '@hapi/boom';

import { models } from '../lib/sequelize';

export interface IRecord {
  operationId: string;
  userId: string;
  amount: number;
  userBalance: number;
  operationResponse: number;
  date: Date;
}

class RecordService {
  constructor() {}

  async find(query: any) {
    const options: any = {
      include: ['user', 'operation'],
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { amount } = query;
    if (amount) {
      options.where.amount = amount;
    }

    const record = await models.Record.findAll(options);
    return record;
  }

  async findOne(id: string) {
    const record = await models.Record.findByPk(id, {
      include: ['user', 'operation'],
    });
    return record;
  }

  async findByUser(userId: string) {
    const record = await models.Record.findOne({
      where: { userId },
      include: ['user', 'operation'],
    });
    return record;
  }

  async create(data: any) {
    const record = await models.Record.create(data);
    return record;
  }
}

export default RecordService;
