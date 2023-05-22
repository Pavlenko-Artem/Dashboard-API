import { NextFunction, Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class.js';

export class ExeptionFilter implements IExeptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(
    error: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Ошибка ${error.statusCode} : ${error.message}`
      );
      return res.status(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      return res.status(500).send({ error: error.message });
    }
  }
}
