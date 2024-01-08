import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import configurationService from './util/data/ configuration-service.js';
import get404 from './controllers/error.js';
import taskRoutes from './routes/task.js';
import { mongoConnect } from './util/database.js';

const app = express();
const port = configurationService.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/task', taskRoutes);

app.use((error, req, res, next) => {
    res.status(error.httpStatusCode).render('error', {
        message: error.message.replace(/\n/g, '<br>'),
    });
});

app.use(get404);

await mongoConnect();

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log('Server is running on port 3000');
});
