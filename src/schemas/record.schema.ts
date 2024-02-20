import Joi from 'joi';

const id = Joi.string().uuid();
const operationId = Joi.string();
const userId = Joi.number();
const amount = Joi.number();
const userBalance = Joi.number();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const queryRecordSchema = Joi.object({
  limit,
  offset,
  amount,
});

const createRecordSchema = Joi.object({
  operationId,
  userId,
  amount,
  userBalance,
});

const getRecordSchema = Joi.object({
  id: id.required(),
});

export { createRecordSchema, queryRecordSchema, getRecordSchema };
