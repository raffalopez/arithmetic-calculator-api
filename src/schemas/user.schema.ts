import Joi from 'joi';

const id = Joi.string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(6);
const isActive = Joi.boolean();
const amount = Joi.number().min(0);

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const getUserSchema = Joi.object({
  id: id.required(),
});

const queryUserSchema = Joi.object({
  limit,
  offset,
  email,
});

const updateAmount = Joi.object({
  amount: amount.required(),
  isActive,
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  amount: amount.required(),
  isActive,
});

export { createUserSchema, queryUserSchema, getUserSchema, updateAmount };
