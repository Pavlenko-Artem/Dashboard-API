import express, { NextFunction, Request, Response } from 'express';

import { userRouter } from './users/users.js';

const PORT = 5000;
const app = express();

app.use((req, res, next) => {
  console.log('All');
  next();
});

app.get('/hello', (req, res) => {
  throw new Error('Error!!!');
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
