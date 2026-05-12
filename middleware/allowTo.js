module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.json({ message: "not allowed to do this." });
    }
    next();
  };
};
