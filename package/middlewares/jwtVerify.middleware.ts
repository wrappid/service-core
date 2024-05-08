import jwt from "jsonwebtoken";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";

export const jwtVerify = (req: any, res: any, next: any) => {
  WrappidLogger.logFunctionStart("jwtVerify");
  const {
    accessTokenSecret="",
    // refreshAccessTokenSecret="",
    // expTime="60m",
    // expTimeRefreshToken="1000m"
  } = ApplicationContext.getContext(constant.CONFIG_KEY);
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
      if (err) {
        return res.status(401).json({ message: "unauthorised access" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(403).json({ message: "Invalid request" });
  }
};
