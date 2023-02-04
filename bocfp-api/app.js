const express = require('express');
const app = express();
const cors = require("cors")

const port = 5000;
app.use(cors())
// app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(express.json({ limit: '50mb' }));

// 
const mysql = require('mysql');
const { json, query } = require('express');
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
// name format
function nameFormat(string) {
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// GET
// get all child
app.get('/childs', (req, res) => {
  const { limit, offset, filter, search } = req.query

  let query = `SELECT * FROM child WHERE soft_delete = 0 ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`

  // get all filter
  if (filter === 'male') {
    query = `SELECT * FROM child WHERE soft_delete = 0 AND sex = 'M' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
  }
  else if (filter === 'female') {
    query = `SELECT * FROM child WHERE soft_delete = 0 AND sex = 'F' ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
  }
  else if (filter === 'age') {
    query = `SELECT *, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), bdate)), '%Y') + 0 AS age 
    FROM child WHERE soft_delete = 0 ORDER BY age ASC LIMIT ${limit} OFFSET ${offset}`
  }
  else if (filter === 'deleted') {
    query = `SELECT * FROM child WHERE soft_delete = 1 ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
  }

  // if search has value
  if (search) {
    query = `SELECT * FROM child WHERE 
      soft_delete = 0 AND id LIKE "${search}"
      OR soft_delete = 0 AND fname LIKE "%${search}%"
      OR soft_delete = 0 AND lname LIKE"%${search}%" LIMIT ${limit} OFFSET ${offset}`

    if (filter === 'male') {
      query = `SELECT * FROM child WHERE 
        soft_delete = 0 AND sex = 'M' AND id LIKE "${search}"
        OR soft_delete = 0 AND sex = 'M' AND fname LIKE "%${search}%"
        OR soft_delete = 0 AND sex = 'M' AND lname LIKE"%${search}%" LIMIT ${limit} OFFSET ${offset}`
    }
    else if (filter === 'female') {
      query = `SELECT * FROM child WHERE 
        soft_delete = 0 AND sex = 'F' AND id LIKE "${search}"
        OR soft_delete = 0 AND sex = 'F' AND fname LIKE "%${search}%"
        OR soft_delete = 0 AND sex = 'F' AND lname LIKE"%${search}%" LIMIT ${limit} OFFSET ${offset}`
    }
    else if (filter === 'age') {
      query = `SELECT * FROM
        (SELECT *, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), bdate)), '%Y') + 0 AS age 
        FROM child WHERE soft_delete = 0) AS result WHERE age = "${search}" ORDER BY age LIMIT ${limit} OFFSET ${offset}`
    }
    else if (filter === 'deleted') {
      query = `SELECT * FROM child WHERE 
      soft_delete = 1 AND id LIKE "${search}"
      OR soft_delete = 1 AND fname LIKE "%${search}%"
      OR soft_delete = 1 AND lname LIKE"%${search}%" LIMIT ${limit} OFFSET ${offset}`
    }
  }

  connection.query(query, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "No Child(s) Found", "id": "" })
    }
  })
});
// get specific child
app.get('/child/profile/:id', (req, res) => {
  const { id } = req.params

  connection.query(`SELECT *, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), bdate)), '%Y') + 0 AS age
      FROM child WHERE id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    else if (!rows[0]) {
      res.send(`No child with id: ${id}`)
    }

    res.json(rows[0])
  })
});
// search child fname and lname
// app.get('/child/duplicate/', (req, res) => {
//   const { fname, lname } = req.query

//   connection.query(`SELECT * FROM child WHERE fname = "${fname}"
//     AND lname = "${lname}"`, (err, rows, fields) => {
//     if (rows.length) {
//       res.json(rows)
//     }
//     else {
//       res.json({ "message": "1" })
//     }
//   })
// });
// get record
app.get('/records/:id', (req, res) => {
  const { limit, offset } = req.query

  let query 

  if(limit == 5){
    query = `SELECT * FROM record WHERE id=${req.params.id} AND soft_delete = 0 ORDER BY record_id ASC LIMIT ${limit} OFFSET ${offset}`
  }
  else if (limit == 10){
    query = `SELECT * FROM record WHERE id=${req.params.id} AND soft_delete = 0 ORDER BY record_id ASC LIMIT ${limit} OFFSET ${offset}`
  }

  connection.query(query, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "No Record(s) Found", "bttn": 1 })
    }
  })
});
// get specific record
app.get('/record/:id', (req, res) => {
  connection.query(`SELECT * FROM record WHERE record_id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    else if (!rows[0]) {
      res.send(`No record with id: ${id}`)
    }
    res.json(rows[0])
  })
});
// get all guardian
app.get('/guardians', (req, res) => {
  const { limit, offset, search, filter } = req.query

  let query = `SELECT * FROM guardian WHERE soft_delete = 0 ORDER BY guardian_id DESC LIMIT ${limit} OFFSET ${offset}`

  if(filter === 'deleted') {
    query = `SELECT * FROM guardian WHERE soft_delete = 1 ORDER BY guardian_id DESC LIMIT ${limit} OFFSET ${offset}`
  }

  if (search) {
    query = `SELECT * FROM guardian WHERE 
      soft_delete = 0 AND guardian_id LIKE "${search}"
      OR soft_delete = 0 AND fname LIKE "%${search}%"
      OR soft_delete = 0 AND lname LIKE "%${search}%" 
      OR soft_delete = 0 AND household_id LIKE "%${search}%" LIMIT ${limit} OFFSET ${offset}`

    if(filter === 'deleted'){
      query = `SELECT * FROM guardian WHERE 
        soft_delete = 1 AND guardian_id LIKE "${search}"
        OR soft_delete = 1 AND fname LIKE "%${search}%"
        OR soft_delete = 1 AND lname LIKE "%${search}%" 
        OR soft_delete = 1 AND household_id LIKE "%${search}%" LIMIT ${limit} OFFSET ${offset}`
    }
  }

  connection.query(query, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "No Guardian(s) Found" })
    }
  })
});
// get specific guardian
app.get('/guardian/profile/:id', (req, res) => {
  connection.query(`SELECT * FROM guardian WHERE guardian_id=${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    else if (!rows[0]) {
      res.send(`No guardian with id: ${id}`)
    }
    res.json(rows[0])
  })
});
// search guardian fname, lname and household_id
// app.get('/guardian/duplicate/name/hid/', (req, res) => {
//   const { fname, lname, household_id } = req.query

//   connection.query(`SELECT
//   (SELECT COUNT(*) FROM guardian WHERE fname = "${fname}" AND lname = "${lname}") AS nameResult,
//   (SELECT COUNT(*) FROM guardian WHERE household_id = "${household_id}") AS idResult`, (err, rows, fields) => {
//     if (rows.length) {
//       res.json(rows[0])
//     }
//   })
// });
// link get
app.get('/link/:id', (req, res) => {
  const { id } = req.params
  const { type } = req.query

  let query

  // get linked child to guardian
  if(type === 'child'){
    query = `SELECT guardian.fname, guardian.lname, guardian.address, 
      guardian.contact, link.relationship, guardian.guardian_id
      FROM link JOIN guardian ON link.guardian_id = guardian.guardian_id
      WHERE link.id = ${id} AND link.soft_delete = 0 AND guardian.soft_delete = 0`
  }
  // get linked guardian to child
  else if(type === 'guardian'){
    query = `SELECT *
      FROM link JOIN child ON link.id = child.id
      WHERE link.guardian_id = ${id} AND child.soft_delete = 0`
  }
  // get link details
  else if(type === 'link'){
    query = `SELECT * FROM link WHERE link_id = ${id}`
  }

  connection.query(query, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows[0])
    }
    else {
      if(type === 'child'){
        res.json({ "message": "No Linked Guardian Yet" })
      }
      else if(type === 'guardian'){
        res.json({ "message": "No Linked Child Yet" })
      }
    }
  })
});
// get linked guardian to child
app.get('/guardian/link/:id', (req, res) => {
  connection.query(`SELECT *
      FROM link JOIN child ON link.id = child.id
      WHERE link.guardian_id = ${req.params.id} AND link.soft_delete = 0`, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows[0])
    }
    else {
      res.json({ "message": "No Linked Child Yet", "relationship": "" })
    }
  })
});
// get linked child to guardian
app.get('/child/link/:id', (req, res) => {
  connection.query(`SELECT guardian.fname, guardian.lname, guardian.address, 
      guardian.contact, link.relationship, guardian.guardian_id
      FROM link JOIN guardian ON link.guardian_id = guardian.guardian_id
      WHERE link.id = ${req.params.id} AND link.soft_delete = 0;`, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows[0])
    }
    else {
      res.json({ "message": "No Linked Guardian Yet", "relationship": "" })
    }
  })
});
// get user
app.get('/users', (req, res) => {
  const { limit, offset, search, filter } = req.query

  let query = `SELECT * FROM user WHERE soft_delete = 0 LIMIT ${limit} OFFSET ${offset}`

  if(filter === 'deleted') {
    query = `SELECT * FROM user WHERE soft_delete = 1 LIMIT ${limit} OFFSET ${offset}`
  }

  if (search) {
    query = `SELECT * FROM user WHERE 
      soft_delete = 0 AND user_id LIKE "${search}"
      OR soft_delete = 0 AND username LIKE "${search}"
      OR soft_delete = 0 AND fname LIKE "%${search}%"
      OR soft_delete = 0 AND lname LIKE"%${search}%" LIMIT ${limit} OFFSET ${offset}`

      if(filter === 'deleted'){
        query = `SELECT * FROM user WHERE 
          soft_delete = 1 AND user_id LIKE "${search}"
          OR soft_delete = 1 AND username LIKE "${search}"
          OR soft_delete = 1 AND fname LIKE "%${search}%"
          OR soft_delete = 1 AND lname LIKE"%${search}%" LIMIT ${limit} OFFSET ${offset}`
      }
  }
  connection.query(query, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "No User(s) Found" })
    }
  })
});
// search user fname and lname
app.get('/user/duplicate/', (req, res) => {
  const { fname, lname } = req.query

  connection.query(`SELECT * FROM user WHERE fname = "${fname}"
    AND lname = "${lname}"`, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "1" })
    }
  })
});
// search user username
app.get('/user/username/duplicate/', (req, res) => {
  const { username } = req.query

  connection.query(`SELECT * FROM user WHERE username = "${username}"`, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "1" })
    }
  })
});
// search user fname, lname
app.get('/user/duplicate/name/username/', (req, res) => {
  const { fname, lname, username } = req.query

  connection.query(`SELECT
  (SELECT COUNT(*) FROM user WHERE fname = "${fname}" AND lname = "${lname}") AS nameResult,
  (SELECT COUNT(*) FROM user WHERE username = "${username}") AS usernameResult`, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows[0])
    }
  })
});
// get all announcement
app.get('/announcements', (req, res) => {
  const { limit, offset, search } = req.query

  let query = `SELECT * FROM announcement WHERE soft_delete = 0 ORDER BY annou_id DESC LIMIT ${limit} OFFSET ${offset}`

  if (search) {
    query = `SELECT * FROM announcement WHERE 
      soft_delete = 0 AND title LIKE "%${search}%" LIMIT ${limit} OFFSET ${offset}`
  }

  connection.query(query, (err, rows, fields) => {
    if (rows.length) {
      res.json(rows)
    }
    else {
      res.json({ "message": "No Announcement(s) Found" })
    }
  })

});


// POST
// add new child
app.post('/child', (req, res) => {
  let { fname, lname } = req.body
  const { bdate, sex, image } = req.body;

  fname = nameFormat(fname)
  lname = nameFormat(lname)

  connection.query(`INSERT INTO child (fname, lname, bdate, sex, image) 
        VALUES ('${fname}', '${lname}', '${bdate}', '${sex}', '${image}')`, (err, rows, fields) => {
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
app.post('/guardian', (req, res) => {
  let { fname, lname } = req.body
  const { contact, address, household_id } = req.body;
  
  // search pre-existing household id
  connection.query(`SELECT
    (SELECT COUNT(*) FROM guardian WHERE household_id = "${household_id}") AS idResult`), (err, rows, fields) => {
    if (err) throw err
    else if (rows[0].idResult) {
      res.status(404).send("Household ID already been taken")
    }
    else {
      fname = nameFormat(fname)
      lname = nameFormat(lname)
    
      connection.query(`INSERT INTO guardian (fname, lname, contact, address, household_id) 
            VALUES ('${fname}', '${lname}', '${contact}', '${address}', '${household_id}')`, (err, rows, fields) => {
        if (err) throw err
      })
      res.status(200).send("success")
    }
  }
});
// add link to guardian & child #
app.post('/link/add/:guardian_id', (req, res) => {
  const { relationship, id } = req.body;
  const { guardian_id } = req.params;



  connection.query(`INSERT INTO link (guardian_id, id, relationship) 
        VALUES ('${guardian_id}','${id}', '${relationship}')`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// get user
app.post('/user/login', (req, res) => {
  const { username, password } = req.body

  connection.query(`SELECT * FROM user WHERE username='${username}' AND password='${password}' AND soft_delete = 0`, (err, rows, fields) => {
    // console.log(rows.length)
    if (!rows.length) {
      res.json({ "message": "Incorrect Username or Password" })
    }
    else if (rows[0].username == username && rows[0].password == password) {
      res.json({ "message": "Success!", "id": `${rows[0].user_id}`, "fname": `${rows[0].fname}`, "admin_power": `${rows[0].admin_power}` })
    }
  })
});
// get specific user
app.get('/user/profile/:id', (req, res) => {
  connection.query(`SELECT user_id, fname, lname, username, contact,admin_power,
    CASE 
      WHEN admin_power = 1 THEN 'YES'
      ELSE "NO"
    END AS result
    FROM user WHERE user_id=${req.params.id}`, (err, row, fields) => {
    if (row) {
      res.json(row[0])
    }
    else {
      res.json({ "message": "User not found" })
    }
  })

});
// add new user
app.post('/user', (req, res) => {
  let { fname, lname } = req.body
  const { username, contact, admin_power, password } = req.body;

  fname = nameFormat(fname)
  lname = nameFormat(lname)

  connection.query(`INSERT INTO user (fname, lname, username, contact, admin_power, password) 
        VALUES ('${fname}', '${lname}', '${username}', '${contact}', '${admin_power}', '${password}')`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// add new announcement
app.post('/announcement/new', (req, res) => {
  const { title, content, user_id } = req.body;

  connection.query(`INSERT INTO announcement (title, content, user_id) 
        VALUES ('${title}', '${content}', '${user_id}')`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});


// PUT
// update child
app.patch('/childUpdate/:id', (req, res) => {
  let { fname, lname } = req.body
  const { id, bdate, sex, image } = req.body;

  fname = nameFormat(fname)
  lname = nameFormat(lname)

  connection.query(`UPDATE child SET fname = '${fname}', lname = '${lname}', bdate = '${bdate}', 
      sex ='${sex}', image='${image}' WHERE id=${id}`, (err, rows, fields) => {
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
// update guardian
app.put('/guardUpdate/:id', (req, res) => {
  let { fname, lname } = req.body
  const { contact, address, household_id } = req.body;
  const { id } = req.params

  fname = nameFormat(fname)
  lname = nameFormat(lname)

  // (SELECT COUNT(*) FROM guardian WHERE fname = "${fname}" AND lname = "${lname}") AS nameResult,

  connection.query(`SELECT guardian_id, household_id FROM guardian WHERE household_id = "${household_id}"`, (err, rows, fields) => {
    if (err) throw err
    else if (rows[0].guardian_id != id && rows[0].household_id === household_id) {
      res.status(409).json({ message: "Household ID already been taken" })
    }
    else {
      connection.query(`UPDATE guardian SET fname = '${fname}', lname = '${lname}',
        contact = '${contact}', address = '${address}', household_id = '${household_id}'
        WHERE guardian_id=${id}`, (err, rows, fields) => {
        if (err) throw err
      })
      res.status(200).json({ message: "success" })
    }
  })
});
// edit user
app.put('/user/edit/:id', (req, res) => {
  let { fname, lname } = req.body
  const { user_id, contact, admin_power, username } = req.body;

  fname = nameFormat(fname)
  lname = nameFormat(lname)

  connection.query(`UPDATE user SET fname = '${fname}', lname = '${lname}',
      contact = '${contact}', admin_power = '${admin_power}', username = '${username}'
      WHERE user_id=${user_id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// edit user password
app.put('/user/edit/password/:id', (req, res) => {
  const { id } = req.params
  const { password } = req.body;

  connection.query(`UPDATE user SET password = '${password}' WHERE user_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// edit announcement
app.put('/announcement/edit/:annou_id', (req, res) => {
  const { annou_id } = req.params
  const { title, content } = req.body;

  connection.query(`UPDATE announcement SET title = '${title}', content = '${content}'
      WHERE annou_id=${annou_id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// edit link
app.put('/link/:id', (req, res) => {
  const { id } = req.params
  const { relationship } = req.body;

  connection.query(`UPDATE link SET relationship = '${relationship}' WHERE link_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});


// UNDO
// undo child
app.put('/child/ret/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`UPDATE child SET soft_delete='0' WHERE id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
})
// undo guardian
app.put('/guardian/ret/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`UPDATE guardian SET soft_delete='0' WHERE guardian_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
})
// undo user
app.put('/user/ret/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`UPDATE user SET soft_delete='0' WHERE user_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
})

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
// soft delete link
app.put('/link/del/:guardian_id', (req, res) => {
  const { guardian_id } = req.params;

  connection.query(`UPDATE link SET soft_delete='1'  WHERE guardian_id=${guardian_id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// soft delete user
app.put('/user/del/:user_id', (req, res) => {
  const { user_id } = req.params;

  connection.query(`UPDATE user SET soft_delete='1'  WHERE user_id=${user_id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
// soft delete announcement
app.put('/announcement/del/:annou_id', (req, res) => {
  const { annou_id } = req.params;

  connection.query(`UPDATE announcement SET soft_delete='1'  WHERE annou_id=${annou_id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
})

// dashboard stuff
// get total child
app.get('/child/count/', (req, res) => {
  connection.query(`SELECT COUNT(id) FROM child WHERE soft_delete = 0`, (err, count, fields) => {
    if (err) throw err
    res.json(count[0]["COUNT(id)"])
  })
});
// get child latest record
app.get('/child/newRecord/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT height, weight, remark, output FROM record WHERE id = ${id} AND soft_delete = 0  ORDER BY record_id DESC LIMIT 1`, (err, row, fields) => {
    if (row.length) {
      res.json(row[0])
    }
    else {
      res.json({ "message": "No Recent Record yet", "remark": "" })
    }
  })
});
// BMI remarks
app.get('/child/remarks', (req, res) => {
  let results = {
    "Underweight": 0,
    "Normal": 0,
    "Overweight": 0,
    "Obese": 0
  }

  connection.query(`SELECT remark FROM record 
      INNER JOIN (SELECT MAX(date) as maxdate FROM record GROUP BY id) tm ON record.date = tm.maxdate 
      JOIN child ON child.id = record.id 
      WHERE child.soft_delete = 0 AND record.soft_delete = 0`, (err, rows, fields) => {
    if (rows) {
      rows.forEach(item => results[item.remark] += 1)
      res.json(results)
    }
    else {
      res.json({ "message": "No result(s)" })
    }
  })
});

// HARD DELETE
// delete child
app.delete('/link/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM link WHERE link_id=${id}`, (err, rows, fields) => {
    if (err) throw err
  })
  res.send("success")
});
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