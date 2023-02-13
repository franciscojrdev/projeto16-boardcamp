import { db } from "../config/database.js";

export const listRentals = async (req, res) => {
  try {

    const {rows: findRentals} = await db.query(`SELECT * FROM rentals;`)

    res.send(findRentals)
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createRentals = async (req, res) => {
  const { customerId, gameId, daysRented,rentDate,pricePerDay } = res.locals.rentalData;
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


export const finishRental = async (req,res) => {
  console.log(req)
  console.log(res)

}