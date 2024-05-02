const express = require('express');
const router = express.Router();
const { Member } = require('../models/');

router.get('/userInfo', async (req, res) => {
  // if (!req.session.login) {
  //   req.session.login = false;
  //   req.session.idx = -1;
  // }
  // console.log('req.body: ' + req.body);
  // const id = req.body.id;
  // try {
  //   if (req.mamber) {
  //     const member = await Member.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });
  //     res.status(200).json(member);
  //     res.send(mamber);
  //     console.log(user_id + ', ' + id + ', ' + password + ', ' + userName);
  //   } else {
  //     res.status(200).json(null);
  //   }
  // } catch (err) {
  //   console.error(err);
  //   next(err);
  // }
});

router.post('/login', async (req, res) => {
  const user_id = req.body.id;
  const user_pass = req.body.password;

  // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
  Member.findOne({
    where: { id: user_id },
  }).then((user) => {
    if (user == null || user.dataValues.password != user_pass) {
      responseData = { result: 'no', flag: req.session.login };
      console.log('로그인 실패');
      return res.json(responseData);
    } else {
      req.session.login = true;
      req.session.idx = user.dataValues.id;
      responseData = {
        result: 'ok',
        session: req.session.login,
        id: user_id,
        userName: user.dataValues.userName,
        user_id: user.dataValues.user_id,
      };
      console.log('로그인 성공');
      res.json(responseData);
    }
  });
});

router.post('/logout', async (req, res) => {
  req.session.login = false; //login session 변경
  req.session.idx = -1;
  res.render('index');
});

module.exports = router;
