import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';
import { USER_TABLE } from './user.models';

const RECORD_TABLE = 'records';

const RecordSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'user_id',
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpDate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userBalance: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_balance',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

class Record extends Model {
  static associate(models: {
    [x: string]: ModelStatic<Model<any, any>>;
    Operation: ModelStatic<Model<any, any>>;
  }) {
    this.hasMany(models.Operation, {
      as: 'operation',
      foreignKey: 'record_id',
    });
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: RECORD_TABLE,
      modelName: 'Record',
      timestamps: false,
    };
  }
}

export { RECORD_TABLE, RecordSchema, Record };
