import { configProvider } from "../config/provider.config";

const jwt = require("jsonwebtoken");


const {
  accessTokenSecret,
  // refreshAccessTokenSecret,
  // expTime,
  // expTimeRefreshToken
} = configProvider?.jwt || {
  accessTokenSecret: "",
  // "refreshAccessTokenSecret": "",
  // "expTime": "60m",
  // "expTimeRefreshToken": "1000m"
};

export const jwtVerify = (req: any, res: any, next: any) => {
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
