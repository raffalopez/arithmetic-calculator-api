import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';
import { USER_TABLE } from './user.models';
import { RECORD_TABLE } from './record.models';

const OPERATION_TABLE = 'operation';

const OperationSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'user_id',
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  operationResponse: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'operation_response',
  },
  recordId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'record_id',
    reference: {
      model: RECORD_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.fn('NOW'),
  },
};

class Operation extends Model {
  static associate(models: { Record: ModelStatic<Model<any, any>> }) {
    this.belongsTo(models.Record, { as: 'record' });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: OPERATION_TABLE,
      modelName: 'Operation',
      timestamps: false,
    };
  }
}

export { OPERATION_TABLE, OperationSchema, Operation };
