const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Board, Member } = require('../models/');

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

//특정 사용자가 작성한 글 DB 가져오기
router.get('/userBoardList/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  console.log('--userID type--' + typeof user_id);
  console.log('--userId--' + user_id);
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
  }).then((userBoardList) => {
    res.json(userBoardList);
  });
});

module.exports = router;
