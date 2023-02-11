import { Router } from "express";
import { createGames, listGames } from "../controllers/gamesController.js";
import { validateGameSchema } from "../middlewares/validateGameSchema.js";


const gamesRouter  = Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games",validateGameSchema, createGames);


export default gamesRouter;