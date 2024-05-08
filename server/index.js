const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const session = require('express-session');

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: 'keyboard cat',

    resave: false,

    saveUninitialize: true,
  })
);
app.use(express.urlencoded({ extended: true }));

//Routers
const registrationRouter = require('./routes/Registration');
app.use('/registration', registrationRouter); //라우터에 미들웨어 적용
const user_inform = require('./routes/User_inform');
app.use('/user_inform', user_inform);
const board = require('./routes/Board');
app.use('/board', board);
const comment = require('./routes/Comment');
app.use('/comment', comment);

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log('Server running on port 3002');
  });
});
