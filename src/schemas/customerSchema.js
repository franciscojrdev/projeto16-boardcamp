import Joi from "joi";

export const customerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(10).max(11).required(),
  cpf: Joi.string().pattern(new RegExp('^[0][1-9]\d{9}$|^[1-9]\d{10}$')).required(),
  birthday: Joi.date().format('YYYY-MM-DD').utc().required(),
});
