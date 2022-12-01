const express = require('express');
const app = express();
const cors = require("cors")

const port = 5000;
app.use(cors())
app.use(express.json());

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
app.post('/child', (req, res) => {
    const {fname, lname, bdate, sex, guardian, contact, address} = req.body;
    connection.query(`INSERT INTO child (fname, lname, bdate, sex, guardian, contact, address) 
        VALUES ('${fname}', '${lname}', '${bdate}', '${sex}', '${guardian}', '${contact}', '${address}')`, (err, rows, fields) => {
        if (err) throw err
      })
    res.send("success")
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