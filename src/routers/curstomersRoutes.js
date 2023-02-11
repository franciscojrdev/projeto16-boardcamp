import { Router } from "express";
import {
  createCustomer,
  listCustomers,
  listCustomersById,
  updateCustomer,
} from "../controllers/curstomersController.js";
import { validateCustomerSchema, validateUpdateCustomer } from "../middlewares/validateCustomerSchema.js";

const customerRouter = Router();

customerRouter.get("/customers", listCustomers);

customerRouter.get("/customers/:id", listCustomersById);

customerRouter.post("/customers", validateCustomerSchema, createCustomer);

customerRouter.put("/customers/:id", validateUpdateCustomer, updateCustomer);

export default customerRouter;
