const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
};
