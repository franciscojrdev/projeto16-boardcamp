import dayjs from "dayjs";
import { db } from "../config/database.js";

export const validateRentalBody = async (req, res, next) => {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const { rows: findCustomer } = await db.query(
      `SELECT * FROM customers WHERE id = $1;`,
      [customerId]
    );
    const { rows: findGame } = await db.query(
      `SELECT * FROM games WHERE id = $1;`,
      [gameId]
    );
    const { rows: findRentals } = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1;`,
      [gameId]
    );

    // console.log(findGame[0],findRentals);

    if (
      findCustomer.length === 0 ||
      findGame.length === 0 ||
      isNaN(daysRented) ||
      daysRented === 0 ||
      findRentals.length > findGame[0].stockTotal
    ) {
      return res.sendStatus(400);
    }

    const rentalData = {
      customerId,
      gameId,
      daysRented,
      pricePerDay: findGame[0].pricePerDay,
      rentDate: dayjs().format("YYYY-MM-DD"),
    };
    // console.log(rentalData);
    res.locals.rentalData = rentalData;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const concludeRental = async (req, res, next) => {
  const id = Number(req.params.id);

  dayjs().format("YYYY-MM-DD");

  if (isNaN(id)) return res.sendStatus(400);

  try {
    const { rows: findRental } = await db.query(
      `SELECT * FROM rentals WHERE id = $1;`,
      [id]
    );

    console.log(findRental)
    if (findRental.length === 0) {
      return res.sendStatus(404);
    }
    if (findRental[0].returnDate !== null) {
      return res.sendStatus(400);
    }

    const { rows: result } = await db.query(
      `SELECT DATE_PART('day',now()::timestamp - rentals."rentDate"::timestamp) AS days FROM rentals WHERE id = $1`,[id]);

    const rentalConcludeData = {
      ...findRental[0], days : result[0].days
    }
    console.log(rentalConcludeData)

    res.locals.rentalConcludeData = rentalConcludeData;
    next()
  } catch (error) {
    res.status(500).send(error.message);
  }
};
