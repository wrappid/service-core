import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  /**
   * @todo
   * Database activity realated to Apilogs
   * @param req
   * @param res
   * @param next
   */
  use(req: Request, res: Response, next: Function) {
    console.log(`Request ${req.method} ${req.url} received.`);
    next();
  }
}
