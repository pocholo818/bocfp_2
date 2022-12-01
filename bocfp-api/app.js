const express = require('express');
const app = express();
const cors = require("cors")

const port = 5000;
app.use(cors())

// 
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bocfp'
})

// GET
app.get('/child', (req, res) => {
  connection.query('SELECT * FROM child', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
});

// POST
app.post('/child/:id', (req, res) => {
    connection.query(`SELECT * FROM child WHERE id=${req.params.id}`, (err, rows, fields) => {
        if (err) throw err
        res.json(rows)
      })
});

const start = async () => {
    try {
      app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
};

start();