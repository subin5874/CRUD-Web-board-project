const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./models');

app.use(cors());

//Routers
const registrationRouter = require('./routes/Registration');
app.use('/registration', registrationRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
