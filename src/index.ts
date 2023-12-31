import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import config from './configs/env.config';
import express, { Express, Request, Response } from 'express';

require('./configs/db.config');

const app: Express = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ credentials: true }));

const server = http.createServer(app);

import productRouter from './routes/product';
import userRouter from './routes/user';
import adminRouter from './routes/admin';

app.use(productRouter);
app.use(userRouter);
app.use(adminRouter);

app.get('/', (req: Request, res: Response) => {
  return res.send('Welcome to my API !');
});

app.all('*', (req: Request, res: Response) => {
  return res.status(404).json('Not Found');
});

// require.main === module && --- -> mandatory for tests.
server.listen(config.port, () => {
  console.log(`⚡️[server]: Server started 🚀 running at http://localhost:${config.port}`);
});

export default app;
