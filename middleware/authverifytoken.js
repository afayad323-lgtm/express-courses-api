const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "ERROR",
      message: "Token is required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
