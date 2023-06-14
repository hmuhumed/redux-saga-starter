// server/routes/element.router.js
const express = require('express');
const elementList = [];

const router = express.Router();

router.get('/', (req, res) => {
  res.send(elementList);
});

router.post('/', (req, res) => {
  elementList.push(req.body.newElement);
  //SQL WOULD GO HERE, NOT THE PUSHING
  res.sendStatus(201);
});

module.exports = router;
