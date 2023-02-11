import { Router } from "express";
import { createCustomer, listCustomers, listCustomersById } from "../controllers/curstomersController.js";
import { validateCustomerSchema } from "../middlewares/validateCustomerSchema.js";


const customerRouter = Router();


customerRouter.get("/customers", listCustomers)

customerRouter.get("/customers/:id", listCustomersById)

customerRouter.post("/curstomers",validateCustomerSchema,createCustomer)

customerRouter.put("/curstomers/:id")


export default customerRouter;