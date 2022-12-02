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
// get all child
app.get('/child', (req, res) => {
  connection.query('SELECT * FROM child', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
});
// get specific child
app.get('/child/:id', (req, res) => {
  connection.query(`SELECT * FROM child WHERE id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    res.json(rows[0])
  })
});

// POST
// add new child
app.post('/child', (req, res) => {
  const { fname, lname, bdate, sex, guardian, contact, address } = req.body;

  connection.query(`INSERT INTO child (fname, lname, bdate, sex, guardian, contact, address) 
        VALUES ('${fname}', '${lname}', '${bdate}', '${sex}', '${guardian}', '${contact}', '${address}')`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});

// PUT
// update child
app.put('/childUpdate/:id', (req, res) => {
  const { id, fname, lname, bdate, sex, guardian, contact, address } = req.body;

  connection.query(`UPDATE child SET fname = '${fname}', lname = '${lname}', bdate = '${bdate}', 
      sex ='${sex}', guardian = '${guardian}', contact = '${contact}', address = '${address}'
      WHERE id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});

// DELETE
// delete child
app.delete('/child/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM child WHERE id='${id}'`, (err, rows, fields) => {
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