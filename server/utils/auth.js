const jwt = require("jsonwebtoken");

const secret = "mysecret";
const expiritation = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiritation });
  },
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiritation });
      req.user = data;
    } catch {
      console.log("Invalid Token");
    }
    return req;
  },
};
