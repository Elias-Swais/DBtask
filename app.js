const { PrismaClient } = require('@prisma/client');
const prisma =new PrismaClient();
const Joi = require('joi');
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { tryCatch } = require('./utils/tryCatch');
const app = express();
const cors = require("cors");
const {Client} = require('pg')
const db = require('./queries');
require("dotenv").config();

app.use(express.json());



app.post('/api/cars', async (req,res)=>{
    const car = await prisma.car.create({
        data:{...req.body}
    })
    res.json(car);
});


app.get('/api/cars', async (req,res)=>{
    const cars = await prisma.car.findMany()
    res.json(cars);
});

app.get('/api/cars/:id', async (req,res)=>{
    const id = req.params.id
    const cars = await prisma.car.findUnique({
        where:{id: Number(id)}
    })
    res.json(cars)
});


app.put('/api/cars/:id', async(req,res)=>{
    const id = req.params.id
    const car = await prisma.car.update({
        where:{id: Number(id)},
        data:{...req.body}
    })
    res.json(car)
})


app.delete('/api/cars/:id', async (req,res)=>{
    const id = req.params.id
    const car = await prisma.car.delete({
        where: {id: Number(id)}
    })
    res.json(car)
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening to port ${port}`));


