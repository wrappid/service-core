import fs from "fs";
// import path from "path";
// import morgan from "morgan";
import expressWinston from "express-winston";
import { format, transports } from "winston";

/**
 * @todo
 * must implement winston for logging
 *
 * This logging module built with morgan
 *
 * @param {*} app
 */
export const setupLogging = (app: any) => {
  // log only 4xx and 5xx responses to console
  try {

    const logDirectory = "./logs";
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    app.use(expressWinston.logger({
      transports: [
        // new transports.Console(),
        new transports.File({
          level: "info",
          filename: `${logDirectory}/info.log`
        }),
        new transports.File({
          level: "error",
          filename: `${logDirectory}/error.log`
        }),
        new transports.File({
          level: "debug",
          filename: `${logDirectory}/debug.log`
        }),
      ],
      format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()
      ),
      statusLevels: true
    }));
    

    /**
     * @todo
     * Error log with trace stack not working https://www.npmjs.com/package/express-winston
     */
    const errorFormat = format.printf(({level, meta, timestamp}) => {
      return `${timestamp} ${level}: ${meta.message}`;
    });

    app.use(expressWinston.errorLogger({
      transports: [
        new transports.File({
          filename: `${logDirectory}/logInternalErrors.log`
        })
      ],
      format: format.combine(
        format.json(),
        format.timestamp(),
        errorFormat
      )
    }));

    /*
    app.use(
      morgan("dev", {
        skip: function (res: any) {
          return res.statusCode < 400;
        },
      })
    );
    // log all requests to access.log
    app.use(
      morgan("common", {
        stream: fs.createWriteStream(path.resolve("access.log"), {
          flags: "a",
        }),
      })
    );
    */
  } catch (error) {
    console.log(error);
    throw error;
  }
};
