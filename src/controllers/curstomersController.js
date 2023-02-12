import { db } from "../config/database.js"


export const listCustomers = async (req,res) =>{

    try {
        const findCustomers = await db.query("SELECT * FROM customers")
        res.send(findCustomers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const listCustomersById = async (req,res) => {
    const id = Number(req.params.id)

    if(isNaN(id)) return res.sendStatus(400);

    try {
        const {rows: findCustomer} = await db.query(`SELECT * FROM customers WHERE id = $1`,[id])
        if(findCustomer.length === 0){
            return res.sendStatus(404)
        }
        res.send(findCustomer[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const createCustomer = async (req,res) => {
    const {name,phone,cpf,birthday} = res.locals.customerData;
    try {
        await db.query(`INSERT INTO customers(name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`,[name,phone,cpf,birthday])
        res.sendStatus(201);
    } catch (error) {
        res.send(error.message)
    }
}

export const updateCustomer = async (req,res) => {
    const {name,phone,cpf,birthday} = res.locals.customerUpdateData;
    const id = Number(req.params.id)

    if(isNaN(id)) return res.sendStatus(400);

    try {
        const {rows: findCustomer} = await db.query(`SELECT * FROM customers WHERE id = $1 AND cpf = $2`,[id,cpf])
        if(findCustomer.length === 0){
            return res.sendStatus(404)
        }
        await db.query(`UPDATE customers SET name = $1,phone = $2,cpf = $3 ,birthday = $4 WHERE id = $5;`,[name,phone,cpf,birthday,id])
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}