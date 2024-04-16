const express = require('express');
const router = express.Router();
const { Member } = require('../models/Member');

router.get('/', (req, res) => {
  res.send('/');
});

router.post('/', async (req, res) => {
  const member = req.body;
  await Member.create(member);
  res.json(member);
});

module.exports = router;
