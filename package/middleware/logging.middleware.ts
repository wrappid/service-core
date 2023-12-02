import { Injectable, NestMiddleware } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Request, Response } from "express";
import { Sequelize } from "sequelize";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * @param req 
   * @param res 
   * @param next 
   */
  async use(req: Request, res: Response, next: Function) {
    try {
      const dbResult = await this.databaseService.findAll(
        "application",
        "ApiMids"
      );
      let apiRequestLog = await this.databaseService.create(
        "application",
        "ApiMids",
        {
          ip: req.socket.remoteAddress,
          access_key: " ",
          endpoint: req.originalUrl,
          request: req.method,
          req_body: req.body,
          header_stack: req.headers,
          start_ts: Sequelize.literal("CURRENT_TIMESTAMP"),
        }
      );
      let id = apiRequestLog.id;
      let send = res.send;
      let res_body: any;
      let bodySetFlag = false;
      res.send = function (body) {
        if (!bodySetFlag) {
          res_body = body;
          return send.call(this, body);
        } else {
          return;
        }
      };
      res.on("finish", async () => {
        await this.databaseService.update(
          "application",
          "ApiMids",
          {
            response: res_body,
            response_header: res.getHeaders(),
            response_status: res.statusCode,
            end_ts: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          { where: { id: id } }
        );
        bodySetFlag = true;
      });
      console.log(`Request ${req.method} ${req.url} received.`);
    } catch (error) {
      console.error("Error during API Middleware:", error);
    }
    next();
  }
}
