import boom from '@hapi/boom';

import { models } from '../lib/sequelize';

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
}
export default OperationsService;
