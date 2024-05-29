const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Comment, Member, Board, Like } = require('../models');

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
    order: [['comment_id', 'desc']],
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
    order: [['comment_id', 'desc']],
  }).then((userCommentList) => {
    res.json(userCommentList);
  });
});

//댓글 삭제
router.post('/deleteComment/:commentId', async (req, res) => {
  const comment_id = Number(req.params.commentId);
  await Comment.destroy({
    where: {
      comment_id: comment_id,
    },
  }).then((deleteComment) => {
    res.json(deleteComment);
  });
});

//전체 댓글 수 가져오기
router.get('/commentCount', async (req, res) => {
  await Board.findAll({
    attributes: [
      'board_id',
      [
        sequelize.fn('COUNT', sequelize.col('comments.comment_id')),
        'commentCount',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
      },
    ],
    group: ['Board.board_id'],
    order: [['board_id', 'desc']],
  }).then((boardCommentCount) => {
    res.json(boardCommentCount);
  });
});

//해당 글의 댓글 수 가져오기
router.get('/commentCount/:boardId', async (req, res) => {
  const board_id = Number(req.params.boardId);
  await Comment.count({
    where: {
      board_id: board_id,
    },
  }).then((boardCommentCount) => {
    res.json(boardCommentCount);
  });
});

//사용자의 글 댓글 수 가져오기
router.get('/myPost/commentCount/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  console.log('-comment-id-' + user_id);
  await Board.findAll({
    attributes: [
      'board_id',
      [
        sequelize.fn('COUNT', sequelize.col('comments.comment_id')),
        'commentCount',
      ],
    ],
    include: [
      {
        model: Comment,
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

//사용자가 좋아요한 글의 댓글 수
router.get('/myPostLike/commentCount/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  console.log('-comment-id-' + user_id);
  await Board.findAll({
    attributes: [
      'board_id',
      [
        sequelize.fn('COUNT', sequelize.col('comments.comment_id')),
        'commentCount',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
      },
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

module.exports = router;
