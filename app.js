const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require("./controllers/error");

const mongoConnect = require('./util/database').mongoConnect;

const taskRoutes = require('./routes/task');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/task',taskRoutes);

app.use(errorController.get404);


mongoConnect(() => {
    app.listen(3000);
  });
  