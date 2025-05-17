import * as Joi from 'joi';

export const JoiValidationShema = Joi.object({
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required(),
  PORT: Joi.number().default(3000),
  DB_PORT: Joi.number().required(),
});
