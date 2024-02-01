const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
