import { db } from "../config/database.js"

export const listGames = async (req,res) => {
    try {
        const findGames = await db.query("SELECT * FROM games")
        console.log(findGames)
        res.send(findGames.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const createGames = async (req,res) =>{
    const {name,image,stockTotal,pricePerDay} = req.body
    try {
        // const findRepeatGames = await db.query(`SELECT * FROM games WHERE name = ${name}`)
        // console.log(findRepeatGames)
        // if(findRepeatGames){
        //     return res.status(409).send("Game already exists!")
        // }
        await db.query(`INSERT INTO games (name,image,stockTotal,pricePerDay) VALUES ($1,$2,$3,$4)`,[name,image,stockTotal,pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}