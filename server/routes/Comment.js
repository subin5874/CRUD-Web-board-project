const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Comment, Member, Board } = require('../models');

router.post('/write', async (req, res) => {
  const write_comment = req.body;
  await Comment.create(write_comment);
  res.json(write_comment);
});

//특정 글의 댓글 DB 가져오기
router.get('/commentList/:boardId', async (req, res) => {
  //board_id나 id 하나만 쓰기
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

//특정 사용자의 댓글 DB 가져오기
router.get('/userCommentList/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  await Comment.findAll({
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: Member,
        attributes: ['userName'],
      },
      {
        model: Board,
        attributes: ['title'],
      },
    ],
  }).then((userCommentList) => {
    res.json(userCommentList);
  });
});

module.exports = router;
