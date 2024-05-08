import Sequelize from "sequelize";
import { databaseProvider } from "../database/setup.database";
import { WrappidLogger } from "../logging/wrappid.logger";

export const apiLogger = async (req: any, res: any, next: any) => {
  try {
    WrappidLogger.logFunctionStart("apiLogger");
    const apiRequestLog = await databaseProvider["application"].models[
      "ApiRequestLogs"
    ].create({
      ip: req.socket.remoteAddress,
      access_key: " ",
      endpoint: req.originalUrl,
      request: req.method,
      req_body: req.body,
      header_stack: req.headers,
      start_ts: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    const id = apiRequestLog.id;
    const send = res.send;
    let res_body: any;
    let bodySetFlag = false;
    res.send = function (body: any) {
      if (!bodySetFlag) {
        res_body = body;
        return send.call(this, body);
      } else {
        return;
      }
    };
    res.on("finish", async () => {
      databaseProvider["application"].models["ApiRequestLogs"].update(
        {
          response: res_body,
          response_header: res._headers,
          response_status: res.statusCode,
          end_ts: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        { where: { id: id } }
      );
      bodySetFlag = true;
    });
  } catch (error: any) {
    WrappidLogger.error("WrappidError: Can't log api request to database.");
    // console.error("WrappidError: Can't log api request to database.");
    WrappidLogger.error(error); 
    console.error(error);
  } finally {
    WrappidLogger.logFunctionEnd("apiLogger");
    next();
  }
};
