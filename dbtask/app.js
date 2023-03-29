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




app.post('/api/cars',db.createCar);


app.get('/api/cars',db.getCars);


app.put('/api/cars/:id',db.updateCar);


app.delete('/api/cars/:id',db.deleteCar);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening to port ${port}`));


