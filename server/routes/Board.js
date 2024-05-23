const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Board, Member, Like } = require('../models/');

router.post('/write', async (req, res) => {
  //비동기식으로 전달
  const write_board = req.body;
  await Board.create(write_board);
  res.json(write_board);
});

//board 전체 DB 가져오기
router.get('/boardList', async (req, res) => {
  await Board.findAll({
    include: [
      {
        model: Member,
        attributes: ['userName'],
      },
    ],
    order: [['board_id', 'desc']],
  }).then((board) => {
    res.json(board);
  });
});

//하나의 board DB 가져오기
router.get('/boardDetail/:boardId', async (req, res) => {
  //board_id나 id 둘 중 하나 수정하기
  let board_id = Number(req.params.boardId);
  console.log('--type: ' + typeof board_id);
  console.log('---id before---: ' + board_id);
  let id = Number(board_id);
  console.log('---id after---: ' + id);
  await Board.findOne({
    where: {
      board_id: id,
    },
    include: [
      {
        model: Member,
        attributes: ['userName'],
      },
    ],
  }).then((boardData) => {
    res.json(boardData);
  });
});

//글 수정하기
router.post('/updateBoard/:boardId', async (req, res) => {
  const board_id = Number(req.params.boardId);
  const board_data = req.body;
  await Board.update(
    { title: board_data.title, content: board_data.content },
    {
      where: {
        board_id: board_id,
      },
    }
  ).then((boardData) => {
    res.json(boardData);
  });
});

//글 삭제하기
router.post('/deleteBoard/:boardId', async (req, res) => {
  const board_id = Number(req.params.boardId);
  await Board.destroy({
    where: {
      board_id: board_id,
    },
  });
});

//특정 사용자가 작성한 글 DB 가져오기
router.get('/userBoardList/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  await Board.findAll({
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: Member,
        attributes: ['userName'],
      },
    ],
    order: [['board_id', 'desc']],
  }).then((userBoardList) => {
    res.json(userBoardList);
  });
});

//특정 사용자가 좋아요한 글 DB 가져오기
router.get('/userLikeBoardList/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  await Board.findAll({
    include: [
      {
        model: Like,
        attributes: [],
        where: {
          user_id: user_id,
        },
        required: true,
      },
      {
        model: Member,
        attributes: ['userName'],
      },
    ],
    order: [['board_id', 'desc']],
  }).then((userBoardList) => {
    res.json(userBoardList);
  });
});

//사용자가 작성한 글의 수 가져오기
router.get('/userPostCount/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  await Board.count({
    where: {
      user_id: user_id,
    },
  }).then((userPostCount) => {
    res.json(userPostCount);
  });
});
module.exports = router;
