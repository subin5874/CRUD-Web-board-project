const express = require('express');
const router = express.Router();
const { Member } = require('../models/');

router.get('/', async (req, res) => {
  //res.send('/');
});

router.post('/', async (req, res) => {
  //비동기식으로 전달
  const member = req.body;
  await Member.create(member);
  res.json(member);
});

module.exports = router;
