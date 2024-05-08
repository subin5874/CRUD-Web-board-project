const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Comment, Member } = require('../models');

router.post('/write', async (req, res) => {
  const write_comment = req.body;
  await Comment.create(write_comment);
  res.json(write_comment);
});

router.get('/commentList/:boardId', async (req, res) => {
  let board_id = Number(req.params.boardId);
  let id = Number(board_id);
  await Comment.findAll({
    where: {
      board_id: id,
    },
    include: [
      {
        model: Member,
        attributes: ['userName'],
      },
    ],
  }).then((CommentData) => {
    res.json(CommentData);
  });
});

module.exports = router;
