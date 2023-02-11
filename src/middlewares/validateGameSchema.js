import { db } from "../config/database.js";
import { gameSchema } from "../schemas/gamesSchema.js";

export const validateGameSchema = async (req, res, next) => {
  const { name, image, stockTotal, pricePerDay } = req.body;

  const gameData = {
    name,
    image,
    stockTotal,
    pricePerDay,
  };

  const { error } = gameSchema.validate(gameData, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return res.status(400).send(errorMessage);
  }
  try {
    const findRepeatName = await db.query(
      `SELECT * FROM games WHERE name = $1`,
      [name]
    );

    if (findRepeatName.rows.length !== 0) {
      return res.status(409).send("Game already exists!");
    }
    res.locals.gameData = gameData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
