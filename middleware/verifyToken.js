const jsonwebtoken = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.substring(7);
    jsonwebtoken.verify(token, process.env.SECRET, {
      algorithms: ['HS256'],
    });
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Token is invalid",
      error,
    });
  }
};

module.exports = validateToken;
