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

router.get('/boardDetail/:boardId', async (req, res) => {
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
    //console.log('boardData: ' + JSON.stringify(boardData));
  });
});
// router.get('/commentCount', async (req, res) => {
//   await Comment.findAll({
//     // where: {
//     //   id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
//     // },
//     attributes: [[sequelize.fn('COUNT', 'comment_id'), 'commentCount']],
//     // include: [
//     //   {
//     //     model: db.User,
//     //     as: 'Comments',
//     //     attributes: [[sequelize.fn('COUNT', 'comment_id'), 'commentCount']],
//     //   },
//     // ],
//   }).then((commentCount) => {
//     res.json(commentCount);
//   });
// });

router.get('/user_board', async (req, res) => {});

module.exports = router;
