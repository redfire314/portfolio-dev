import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import movieRoutes from './routes/moviesRoutes';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('short'));

app.use('/api/movie/', movieRoutes);

export default app;
