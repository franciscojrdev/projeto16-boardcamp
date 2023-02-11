import { db } from "../config/database.js";

export const listGames = async (req, res) => {
  try {
    const findGames = await db.query("SELECT * FROM games");
    console.log(findGames.rows);
    res.send(findGames.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createGames = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = res.locals.gameData;
  try {
    await db.query(
      `INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4);`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
