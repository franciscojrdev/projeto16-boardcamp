import { Router } from "express";
import { createRentals, deleteRental, finishRental, listRentals } from "../controllers/rentalsController.js";
import { concludeRental, validateRentalBody } from "../middlewares/validateRental.js";


const rentalRouter = Router();


rentalRouter.get("/rentals",listRentals);
rentalRouter.post("/rentals",validateRentalBody,createRentals);
rentalRouter.post("/rentals/:id/return",concludeRental, finishRental);
rentalRouter.delete("/rentals/:id", deleteRental);


export default rentalRouter;