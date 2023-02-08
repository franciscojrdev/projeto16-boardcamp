import { Router } from "express";
import { createGames, listGames } from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/gamesSchema.js";


const gamesRouter  = Router();

gamesRouter.get("/games", listGames);

gamesRouter.post("/games",validateSchema(gameSchema), createGames);


export default gamesRouter;