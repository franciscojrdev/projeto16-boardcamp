import Joi from "joi";

export const customerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{10,11}$"))
    .required(),
  cpf: Joi.string().pattern(new RegExp("^[0-9]{11}$")).required(),
  birthday: Joi.date()
    .iso()
    .default(() => moment().format("YYYY-MM-DD"))
    .required(),
});
