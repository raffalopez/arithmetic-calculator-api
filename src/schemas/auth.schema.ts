import Joi from 'joi';

const email = Joi.string().email();
const password = Joi.string().min(6);
const isActive = Joi.boolean();

const login = Joi.object({
  email: email.required(),
  password: password.required(),
  isActive,
});

export { login };
