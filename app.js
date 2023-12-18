const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const taskRoutes = require('./routes/task');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/task',taskRoutes);

mongoConnect(() => {
    app.listen(3000);
  });