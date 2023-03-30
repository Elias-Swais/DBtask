const  Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    password:"zatar123!",
    host:"interns.postgres.database.azure.com",
    port:"5432",
    database:"elias"
})


const getCars = (req,res) =>{
    pool.query("SELECT * FROM cars",(error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows)
    });
};

const createCar = (req,res) =>{
    const {car_name,car_origin} = req.body
    pool.query('INSERT INTO cars (car_name,car_origin) VALUES($1,$2) RETURNING *',[car_name,car_origin],(error,results)=>{
        if(error){
            throw error;
        }
        res.status(201).send(`Car added with ID: ${results.rows[0].id}`)
    });
};

const updateCar = (req,res) =>{
    const id = parseInt(req.params.id);
    const {car_name,car_origin} = req.body;

    pool.query('UPDATE cars SET car_name = $1, car_origin = $2 WHERE id =$3',[car_name,car_origin,id], (error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).send(`Car modified with ID: ${id}`);
    });
};

const deleteCar = (req,res) =>{
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM cars WHERE id = $1',[id],(error,results)=>{
        if(error){
            throw(error);
        }
        res.status(200).send(`Car deleted with ID: ${id}`);
    });
};

module.exports = {
    getCars,
    createCar,
    updateCar,
    deleteCar
}