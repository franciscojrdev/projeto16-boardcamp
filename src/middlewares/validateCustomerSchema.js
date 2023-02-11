import { db } from "../config/database.js";
import { customerSchema } from "../schemas/customerSchema.js";

export const validateCustomerSchema = async (req, res, next) => {
  const { name, phone, cpf, birthday } = req.body;

  const customerData = {
    name,
    phone,
    cpf,
    birthday,
  };

  const { error } = customerSchema.validate(customerData, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return res.status(400).send(errorMessage);
  }
  try {
    const findRepeatCustomer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[cpf])

    if(findRepeatCustomer.rows.length !== 0){
      return res.status(409).send("cpf already exists!")
    }
    res.locals.customerData = customerData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
