import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

import { models, sequelize } from '../lib/sequelize';
import RecordService from '../services/record.service';
import { IData } from '../interfaces/data';
import { IRecord } from '../interfaces/record';

const recordService = new RecordService();

class UserService {
  constructor() {}

  async create(data: IData) {
    try {
      const result = await sequelize.transaction(async () => {
        const hash: string = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({ ...data, password: hash });
        delete newUser.dataValues.password;

        const newRecord: IRecord = {
          userId: newUser.dataValues.id,
          amount: newUser.dataValues.amount,
          userBalance: newUser.dataValues.amount,
        };

        await recordService.create(newRecord);

        return newUser;
      });
      return result;
    } catch (error) {
      throw boom.internal('Create user failed: ' + error);
    }
  }

  async find(query: any) {
    const options: any = {
      include: ['record'],
      attributes: {
        exclude: ['password'],
      },
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { email } = query;
    if (email) {
      options.where.email = email;
    }

    const users = await models.User.findAll(options);
    return users;
  }

  async findByEmail(email: string) {
    const user = await models.User.findOne({
      include: ['record'],
      where: { email },
    });
    return user;
  }

  async findOne(id: string) {
    const user = await models.User.findByPk(id, {
      include: ['record'],
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id: string, changes: any) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
}

export default UserService;
