var jwt = require("jsonwebtoken");

const config = require("../config/provider.config");
const {
    accessTokenSecret,
    // refreshAccessTokenSecret,
    // expTime,
    // expTimeRefreshToken
} = config?.jwt || {
    "accessTokenSecret": "",
    // "refreshAccessTokenSecret": "",
    // "expTime": "60m",
    // "expTimeRefreshToken": "1000m"
};

const jwtVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
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

module.exports = jwtVerify;
