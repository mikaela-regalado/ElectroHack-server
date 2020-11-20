const jwt = require("jsonwebtoken");

module.exports = function adminToken(user) {
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  return {
    token: token,
    userId: user.id,
    isAdmin: true,
    fullName: user.fullName,
    userEmail: user.email,
  };
};
/*Un comentario para pushear*/
