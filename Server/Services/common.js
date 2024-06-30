const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = (req) => {
  // console.log("Hello I'm cookieExtractor 😎");
  let token = null;
  if (req.cookies["jwt"]) {
    console.log("🔥🔥 req.cookies", req.cookies);
  }
  if (req && req.cookies) {
    token = req.cookies["jwt"];
    console.log("TOKEN cookieExtractor : --- ", token);
  } else {
    console.log("TOKEN : Nahi mela yaar");
  }
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTlhYTI2ZGE2ODA2ZThhY2ZmNzYwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE3MTUyMjk0fQ.cXnDSez_5Kw6tPU37OaVkluH1xnffI8TPPp2Qnr3a1A";

  console.log("TOKEN dummy : --- ", token);

  return token;
};
