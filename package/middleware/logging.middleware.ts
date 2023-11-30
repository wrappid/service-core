import { Injectable, NestMiddleware } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Request, Response } from "express";
import { Sequelize } from "sequelize";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * @todo
   * Database activity realated to Apilogs
   * @param req
   * @param res
   * @param next
   */
  async use(req: Request, res: Response, next: Function) {
    const dbResult = await this.databaseService.findAll(
      "wrappid-database1",
      "ApiLogs"
    );
    await this.databaseService.create("wrappid-database1", "ApiLogs", {
      apiId: req.socket.remoteAddress,
      route: req.originalUrl,
      request: req.method,
      start_ts: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    console.log(dbResult);
    console.log(`Request ${req.method} ${req.url} received.`);
    res.on("finish", async () => {
      try {
        // Your asynchronous logic here
        console.log("Response finished!");
      } catch (error) {
        console.error("Error during response finish:", error);
      }
    });

    next();
  }
}
