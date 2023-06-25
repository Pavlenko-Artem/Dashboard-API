import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';

import { IExeptionFilter } from './exeption.filter.interface.js';
import { HTTPError } from './http-error.class.js';
import { ILogger } from '../logger/logger.interface.js';
import { TYPES } from '../types.js';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(
    error: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Ошибка ${error.statusCode}: ${error.message}`
      );
      return res.status(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      return res.status(500).send({ error: error.message });
    }
  }
}
