const jwt = require("jsonwebtoken");

const authMiddlware = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, "self2021", (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Authentication with Token failed.",
        });
      } else {
        req.decoded = decoded;
        req.step = req.url.split("/")[1];
        console.log(req.protocol);
        req.serverUrl = req.protocol + "://" + req.get("host");

        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token was informed.",
    });
  }
};

module.exports = {
  authMiddlware,
};
