const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const app = express()

//using express framework of node js for backend
app.use(express.json());

app.use(cors());

//create connection with mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: 'employee_database'
})

//read the data from database
app.get('/', (req, res)=> {
  let sql = 'Select * FROM employee_info';
  connection.query(sql, (err, results)=> {
    if (err) throw err;
    res.send(results);
  })
})

//create the data into database
app.post('/', (req, res)=> {
  let sql = 'INSERT INTO employee_info (employee_name, job_title, employee_email) VALUES (?)';
  const values = [
    req.body.name,
    req.body.title,
    req.body.email
  ]
  connection.query(sql, [values], (err, results)=> {
    if (err) throw err;
    res.send(results);
  })
})

//update the data into database
app.put('/:id', (req, res) => {
  let sql = "UPDATE employee_info SET employee_name = ?, job_title = ?, employee_email = ? WHERE id = ?";
  const values = [
    req.body.name, 
    req.body.title, 
    req.body.email, 
    req.params.id];
  connection.query(sql, [...values], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.send(results);
  });
});

//delete the data from database
app.delete('/employee_info/:id', (req, res)=> {
  let sql = 'DELETE FROM employee_info WHERE id = ?';
  const id = req.params.id;

  connection.query(sql, [id], (err, results)=> {
    if (err) throw err;
    res.send(results);
  })
})

//listening
app.listen(8081, ()=> {
  console.log('CORS-enabled web server listening on port 8081')
  connection.connect((err)=> {
    if (err) throw err;
    console.log("databse connected"); 
  })
})