const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Like, Member, Board, Comment } = require('../models');

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

//로그인시: 특정 글의 사용자 좋아요 유무 확인
router.get('/likeState/:boardId/:userId', async (req, res) => {
  const board_id = Number(req.params.boardId);
  const user_id = Number(req.params.userId);
  await Like.findOne({
    where: {
      board_id: board_id,
      user_id: user_id,
    },
  }).then((userLikeState) => {
    res.json(userLikeState);
  });
});

//전체 글의 좋아요수
router.get('/likeCount', async (req, res) => {
  await Board.findAll({
    attributes: [
      'board_id',
      [sequelize.fn('COUNT', sequelize.col('likes.like_id')), 'likeCount'],
    ],
    include: [
      {
        model: Like,
        attributes: [],
      },
    ],
    group: ['Board.board_id'],
    order: [['board_id', 'desc']],
  }).then((boardCommentCount) => {
    res.json(boardCommentCount);
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

//사용자 글의 좋아요수
router.get('/myPost/likeCount/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  console.log('-Like-id-' + user_id);
  await Board.findAll({
    attributes: [
      'board_id',
      [sequelize.fn('COUNT', sequelize.col('likes.like_id')), 'likeCount'],
    ],
    include: [
      {
        model: Like,
        attributes: [],
      },
    ],
    where: {
      user_id: user_id,
    },
    group: ['Board.board_id'],
    order: [['board_id', 'desc']],
  }).then((boardCommentCount) => {
    res.json(boardCommentCount);
  });
});

//사용자가 좋아요한 글의 좋아요 수
router.get('/myPostLike/likeCount/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  console.log('-Like-id-' + user_id);
  await Board.findAll({
    attributes: [
      'board_id',
      [sequelize.fn('COUNT', sequelize.col('likes.like_id')), 'likeCount'],
    ],
    include: [
      {
        model: Like,
        attributes: [],
        where: {
          user_id: user_id,
        },
        required: true,
      },
    ],
    group: ['Board.board_id'],
    order: [['board_id', 'desc']],
  }).then((boardCommentCount) => {
    res.json(boardCommentCount);
  });
});

//사용자가 좋아요 한 수
router.get('/userLikeCount/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  await Like.count({
    where: {
      user_id: user_id,
    },
  }).then((userLikeCount) => {
    res.json(userLikeCount);
  });
});

module.exports = router;
