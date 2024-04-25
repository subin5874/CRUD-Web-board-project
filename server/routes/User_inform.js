const express = require('express');
const router = express.Router();
const { Member } = require('../models/');

router.get('/userInfo', async (req, res) => {
  if (!req.session.login) {
    req.session.login = false;
    req.session.idx = -1;
  }
});

router.post('/login', async (req, res) => {
  const user_id = req.body.id;
  const user_pass = req.body.password;

  // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
  Member.findOne({
    where: { id: user_id },
  }).then(function (user) {
    if (user == null || user.dataValues.password != user_pass) {
      responseData = { result: 'no', flag: req.session.login };
      res.json(responseData);
      console.log('로그인 실패');
    } else {
      req.session.login = true;
      req.session.idx = user.dataValues.id;
      responseData = { result: 'ok', session: req.session.login, id: user_id };
      res.json(responseData);
      console.log('로그인 성공');
    }
  });
});

router.post('/logout', async (req, res) => {
  req.session.login = false; //login session 변경
  req.session.idx = -1;
  res.render('index');
});

module.exports = router;
