const express = require('express');
const router = express.Router();
const database = require('../../data/database');
const db = new database('users');
const auth = require('../../auth/middleware');
const bcrypt = require('bcrypt');
// const controller = require('./userController');

router.use(function (req, res, next) {
  res.header(
    "Acces-Control-Allow-Headers",
    "x-acces-token, Origin, Content-Type, Accept"
  );
  next();
});


router.get('/test', auth, (req, res) => {
  res.status(200).json({ message: 'OK' })
})


router.post('/register',(req, res) => {
  let user = req.body
  const db = new database('users')
  if (db.findUserByUsername(user.username) !== undefined){
    res.status(500).json({ message: "usuario ya existente"})
    return
  }
  db.addUser(user)
  console.log(db.table)
  res.status(200).json({ message: 'OK' })
})

router.get('/all', auth, (req, res) => {
  res.json(db.table);
})


module.exports = router;
