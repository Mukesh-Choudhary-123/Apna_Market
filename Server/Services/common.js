const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = (req) => {
  console.log("Hello I'm cookieExtractor 😎");
  let token = null;
  // console.log("🔥 req ", req, "🔥🔥 req.cookies", req.cookies);
  if (req && req.cookies) {
    token = req.cookies["jwt"];
    console.log("TOKEN cookieExtractor : --- ", token);
  } else {
    console.log("TOKEN : Nahi mela yaar");
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTA4NWYxMWIxYTdlM2NhYzYyYTQ3NCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjU1NjIyN30._8q7RdaP9JYsBG0cKutryskmAs-OHzTB7EAg6VXx9lQ";

  return token;
};
