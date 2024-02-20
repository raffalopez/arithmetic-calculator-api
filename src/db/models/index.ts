import { User, UserSchema } from './user.models';
import { Operation, OperationSchema } from './operation.models';
import { Record, RecordSchema } from './record.models';

function setupModels(sequelize: any) {
  User.init(UserSchema, User.config(sequelize));
  Operation.init(OperationSchema, Operation.config(sequelize));
  Record.init(RecordSchema, Record.config(sequelize));

  User.associate(sequelize.models);
  Record.associate(sequelize.models);
  Operation.associate(sequelize.models);
}

export { setupModels };
