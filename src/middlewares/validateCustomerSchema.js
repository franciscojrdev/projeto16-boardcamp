import { db } from "../config/database.js";

export const validateCustomerSchema = async (req, res, next) => {
  const { name, phone, cpf, birthday } = req.body;

  const customerData = {
    name,
    phone,
    cpf,
    birthday,
  };

  const { error } = gameSchema.validate(customerData, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return res.status(400).send(errorMessage);
  }

  try {

    const findRepeatCustomer = await db.query(`SELECT * FROM customers WHERE name = $1;`,[name])

    console.log(findRepeatCustomer.rows)
    console.log(findRepeatCustomer.rows.length)
    res.locals.customerData = customerData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
