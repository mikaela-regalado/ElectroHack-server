const jwt = require("jsonwebtoken");

module.exports = function userToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return {
    token: token,
    userId: user.id,
    fullName: user.fullName,
    userEmail: user.email,
  };
};
