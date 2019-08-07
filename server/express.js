import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import devBundle from './devBundle';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import Template from '../index';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

/**
 * ONLY FOR DEVELOPMENT
 */
devBundle.compile(app);

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('/', (req, res, next) => {
    res.send(Template());
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.name + ': ' + err.message });
    }
});

export default app;
