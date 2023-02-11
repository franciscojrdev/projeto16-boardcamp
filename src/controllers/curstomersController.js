import { db } from "../config/database.js"


export const listCustomers = async (req,res) =>{

    try {
        const findCustomers = await db.query("SELECT * FROM customers")
        console.log(findCustomers)
        res.send(findCustomers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const listCustomersById = async (req,res) => {
    const id = Number(req.params.id)

    if(isNaN(id)) return res.sendStatus(400);

    try {
        const findCustomer = await db.query(`SELECT * FROM customers WHERE id = $1`,[id])
        console.log(findCustomer)
        res.send(findCustomer.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const createCustomer = async (req,res) => {
    const {name,phone,cpf,birthday} = res.locals.customerData;
    try {
        
    } catch (error) {
        res.send(error.message)
    }
}