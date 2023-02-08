import express from "express";
import cors from "cors";
import gamesRouter from "./routers/gamesRoutes.js";
import dotenv from 'dotenv'

const server = express();
dotenv.config()

server.use(cors())
server.use(express.json())

server.use([gamesRouter])

server.listen(process.env.PORT, ()=>{
    console.log(`Server running in port ${process.env.PORT}`)
});
