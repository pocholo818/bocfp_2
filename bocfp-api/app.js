const express = require('express');
const app = express();
const cors = require("cors")

const port = 5000;
app.use(cors())
app.use(express.json());

// 
const mysql = require('mysql');
const { json } = require('express');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bocfp'
})

// funct
function bmi(height, weight, output) {
  const bmi = (weight / (height * height)) * 10000;
  let remark;

  if (bmi >= 30.0) {
    remark = "Obese";
  }
  else if (bmi >= 25.0) {
    remark = "Overweight";
  }
  else if (bmi >= 18.5) {
    remark = "Normal";
  }
  else if (bmi <= 18.4) {
    remark = "Underweight";
  }

  return [remark, bmi];
};

// GET
// get all child
app.get('/childs', (req, res) => {
  connection.query('SELECT * FROM child WHERE soft_delete = 0', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
});
// get specific child
app.get('/child/profile/:id', (req, res) => {
  connection.query(`SELECT * FROM child WHERE id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    res.json(rows[0])
  })
});
// get record
app.get('/records/:id', (req, res) => {
  connection.query(`SELECT * FROM record WHERE id=${req.params.id} and soft_delete=0 ORDER BY record_id DESC`, (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
});
// get specific record
app.get('/record/:id', (req, res) => {
  connection.query(`SELECT * FROM record WHERE record_id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    res.json(rows[0])
  })
});
// get all !deleted guardian
app.get('/guardians', (req, res) => {
  connection.query('SELECT * FROM guardian WHERE soft_delete=0', (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
  })
});
// get specific guardian
app.get('/guardian/profile/:id', (req, res) => {
  connection.query(`SELECT * FROM guardian WHERE guardian_id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    res.json(rows[0])
  })
});
// search guardian
app.get('/guardian/:search', (req, res) => {
  connection.query(`SELECT * FROM guardian WHERE guardian_id LIKE "${req.params.search}"
    OR fname LIKE "%${req.params.search}%"
    OR lname LIKE"%${req.params.search}%"`, (err, rows, fields) => {
    if (err) throw err
    res.json(rows)
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
// add new record
app.post('/record/:id', (req, res) => {
  const { height, weight } = req.body;
  const { id } = req.params;
  let remark = bmi(height, weight)

  connection.query(`INSERT INTO record (id, height, weight, remark, output) 
        VALUES ('${id}','${height}', '${weight}', '${remark[0]}', '${remark[1]}')`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// add new guardian
app.post('/guardian/new', (req, res) => {
  const { fname, lname, contact, address } = req.body;

  connection.query(`INSERT INTO guardian (fname, lname, contact, address) 
        VALUES ('${fname}', '${lname}', '${contact}', '${address}')`, (err, rows, fields) => {
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
// update record
app.put('/record/:id', (req, res) => {
  const { height, weight } = req.body;
  const { id } = req.params;
  let remark = bmi(height, weight)

  connection.query(`UPDATE record SET height = '${height}', weight = '${weight}', remark = '${remark[0]}', 
      output = '${remark[1]}' WHERE record_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});


// SOFT DELETE
// soft delete child
app.put('/child/del/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`UPDATE child SET soft_delete='1'  WHERE id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
})
// soft delete guardian
app.put('/guardianDel/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`UPDATE guardian SET soft_delete='1'  WHERE guardian_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// soft delete record
app.put('/record/del/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`UPDATE record SET soft_delete='1'  WHERE record_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});

// SQL  FUNCTIONS
// get total child
app.get('/child/count/', (req, res) => {
  connection.query(`SELECT COUNT(id) FROM child WHERE soft_delete = 0`, (err, count, fields) => {
    if (err) throw err
    res.json(count[0]["COUNT(id)"])
  })
});
lmao = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Error</title>
</head>

<body>
	<pre>Cannot GET //child/newRecord/</pre>
</body>

</html>`;
// get child latest record
app.get('/child/newRecord/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT height, weight, remark, output FROM record WHERE id = ${id} AND soft_delete = 0  ORDER BY record_id DESC LIMIT 1`, (err, row, fields) => {
    if (err) throw err
    res.json(row[0])
  })
});

// BMI remarks
app.get('/child/remarks', (req, res) => {
  connection.query(`SELECT remark, COUNT(DISTINCT remark) FROM record GROUP BY remark ORDER BY record_id DESC`, (err, count, fields) => {
    if (err) throw err
    res.json(count)
  })
});

// HARD DELETE
// delete child
// app.delete('/child/:id', (req, res) => {
//   const { id } = req.params;

//   connection.query(`DELETE FROM child WHERE id='${id}'`, (err, rows, fields) => {
//     if (err) throw err
//   })
//   res.send("success")
// });
// // delete record
// app.delete('/record/:id', (req, res) => {
//   const { id } = req.params;

//   connection.query(`DELETE FROM record WHERE record_id='${id}'`, (err, rows, fields) => {
//     if (err) throw err
//   })
//   res.send("success")
// });

// 
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