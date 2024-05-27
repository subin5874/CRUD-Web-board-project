const express = require('express');
const router = express.Router();
const { Member } = require('../models/');

router.post('/login', async (req, res) => {
  const user_id = req.body.id;
  const user_pass = req.body.password;

  // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
  await Member.findOne({
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

//정보수정시 비밀번호 확인
router.post('/checkPass', async (req, res) => {
  const user_id = req.body.user_id;
  const user_pass = req.body.password;

  await Member.findOne({
    where: { user_id: user_id, password: user_pass },
  }).then((user) => {
    if (user == null) {
      console.log('비밀번호 일치하지 않음');
      responseData = { result: 'no' };
      return res.json(responseData);
    } else {
      console.log('비밀번호 일치');
      return res.json(user);
    }
  });
});

//회원 정보 수정
router.post('/change_info/:userId', async (req, res) => {
  const user_id = Number(req.params.userId);
  await Member.update(
    { id: req.body.id, userName: req.body.userName },
    {
      where: {
        user_id: user_id,
      },
    }
  ).then((changeInfo) => {
    res.json(changeInfo);
  });
});

module.exports = router;
