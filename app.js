
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import taskRoutes from './routes/task.js'
import get404 from './controllers/error.js';
import {mongoConnect,getDb} from './util/database.js'

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/task',taskRoutes);


app.use((error, req, res, next) => {
    res.status(500).render('500');
  });

app.use(get404);


await mongoConnect();

app.listen(3000);
