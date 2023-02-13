import dayjs from "dayjs";
import { db } from "../config/database.js";

export const listRentals = async (req, res) => {
  try {
    const { rows: findRentals } = await db.query(`SELECT * FROM rentals;`);

    res.send(findRentals);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createRentals = async (req, res) => {
  const { customerId, gameId, daysRented, rentDate, pricePerDay } =
    res.locals.rentalData;
  try {
    // const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = pricePerDay * daysRented;

    await db.query(
      `INSERT INTO rentals(
            "customerId","gameId","rentDate","daysRented","originalPrice") VALUES ($1,$2,$3,$4,$5);`,
      [customerId, gameId, rentDate, daysRented, originalPrice]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const finishRental = async (req, res) => {
  const { id, daysRented, originalPrice, days } = res.locals.rentalConcludeData;

  let DateNow = dayjs().format("YYYY-MM-DD");
  const calcFee = days - daysRented;
  const pricePerDay = originalPrice / daysRented;

  console.log(id, daysRented, originalPrice, days,calcFee,pricePerDay)

  try {
    if (calcFee < 1) {
      await db.query(`UPDATE rentals SET "returnDate" = $1 WHERE id = $2;`, [
        DateNow,
        id,
      ]);
    } else {
      const setFee = calcFee * pricePerDay;
      await db.query(
        `UPDATE rentals SET "returnDate" = $1,"delayFee" = $2 WHERE id = $3;`,
        [DateNow, setFee, id]
      );
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteRental = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.sendStatus(400);

  try {
    const { rows: findRental } = await db.query(
      `SELECT * FROM rentals WHERE id = $1`,
      [id]
    );
    if (findRental.length === 0) {
      return res.sendStatus(404);
    }
    if (findRental[0].returnDate !== null) {
      return res.sendStatus(400);
    }
    await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
