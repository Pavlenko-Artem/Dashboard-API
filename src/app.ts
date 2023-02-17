import express, { Express } from 'express';
import { userRouter } from './users/users.js';
import { Server } from 'http';

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 5000;
  }

  useRoutes() {
    this.app.use('/users', userRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Сервер запущен на порту ${this.port}`);
  }
}
