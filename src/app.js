import express from "express";
import cors from "cors";
import gamesRouter from "./routers/gamesRoutes.js";
import dotenv from 'dotenv'
import customerRouter from "./routers/curstomersRoutes.js";
import rentalRouter from "./routers/rentalsRoutes.js";
dotenv.config()

const server = express();

server.use(cors())
server.use(express.json())

server.use([gamesRouter, customerRouter,rentalRouter])

server.listen(process.env.PORT, ()=>{
    console.log(`Server running in port ${process.env.PORT}`)
});
