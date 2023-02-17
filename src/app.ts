import express, { Express } from 'express';
import { userRouter } from './users/users.js';
import { LoggerService } from './logger/logger.service.js';
import { Server } from 'http';

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 5000;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use('/users', userRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на порту ${this.port}`);
    // console.log(`Сервер запущен на порту ${this.port}`);
  }
}
