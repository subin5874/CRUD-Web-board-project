const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Like, Member, Board } = require('../models');

router.post('/addLike', async (req, res) => {
  const like_data = req.body;
  console.log(like_data);
  await Like.create(like_data);
  res.json(like_data);
});

router.post('/deleteLike', async (req, res) => {
  const board_id = req.body.board_id;
  const user_id = req.body.user_id;
  await Like.destroy({
    where: {
      board_id: board_id,
      user_id: user_id,
    },
  });
});

//특정 글의 사용자 좋아요 유무 확인
router.get('/likeState/:boardId/:userId', async (req, res) => {
  const board_id = Number(req.params.boardId);
  const user_id = Number(req.params.userId);
  await Like.findOne({
    where: {
      board_id: board_id,
      user_id,
      user_id,
    },
  }).then((userLikeState) => {
    res.json(userLikeState);
  });
});

//특정 글의 좋아요수
router.get('/likeCount/:boardId', async (req, res) => {
  const board_id = Number(req.params.boardId);
  await Like.count({
    where: {
      board_id: board_id,
    },
  }).then((boardLikeCount) => {
    res.json(boardLikeCount);
  });
});

//전체 글의 좋아요수
router.get('/likeCount', async (req, res) => {
  await Like.findAll({
    attributes: [
      'board_id',
      [sequelize.fn('count', sequelize.col('board_id')), 'likecount'],
    ],
    group: ['board_id'],
  }).then((boardLikeCount) => {
    res.json(boardLikeCount);
  });
});

module.exports = router;
