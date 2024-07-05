const passport = require("passport");
const nodemailer = require("nodemailer");
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

// Email

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "mukeshchoudhary1062003@gmail.com",
    pass: "umqz whsa zizp ttdy",
  },
});

exports.sendMail = async function ({ to, subject, text, html }) {
  // send mail with defined transport object

  let info = await transporter.sendMail({
    from: '"Apna Market" <mukeshchoudhary1062003@gmail.com.email>', // sender address
    to: to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
};
