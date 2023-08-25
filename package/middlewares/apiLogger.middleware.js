const databaseProvider = require("../database/provider.database");
let Sequelize = require("sequelize");

const apiLogger = async (req, res, next) => {
  try {
    let apiRequestLog = await databaseProvider["application"].models[
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

    let id = apiRequestLog.id;
    let send = res.send;
    let res_body;
    let bodySetFlag = false;
    res.send = function (body) {
      if(!bodySetFlag){
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
  } catch (error) {
    console.error(error);
    // throw new Error(error);
  } finally {
    next();
  }
};

module.exports = apiLogger;
