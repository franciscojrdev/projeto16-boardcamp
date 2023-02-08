import Joi from "joi";

export const gameSchema = Joi.object({
    name: Joi.string().min(3).required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().integer().greater(0).required(),
    pricePerDay: Joi.number().greater(0).required(),
})