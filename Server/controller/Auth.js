const { sanitizeUser } = require("../Services/common");
const { User } = require("../model/User");
const crypto = require("crypto");

const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    // const salt = crypto.randomBytes(16);
    // crypto.pbkdf2(
    //   req.body.password,
    //   salt,
    //   310000,
    //   32,
    //   "sha256",
    //   async function (err, hashedPassword) {
    //     const user = new User({ ...req.body, password: hashedPassword, salt });

    //     const doc = await user.save();

    //     req.login(sanitizeUser(doc), (err) => {
    //       if (err) {
    //         res.status(400).json(err);
    //       } else {
    //         const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
    //         console.log("🎯 New User token: ", token);
    //         console.log(" New User ", { id: doc.id, role: doc.role });
    //         res
    //           .cookie("jwt", token, {
    //             expires: new Date(Date.now() + 3600000),
    //             httpOnly: true,
    //           })
    //           .status(201)
    //           .json({ id: doc.id, role: doc.role });
    //       }
    //     });
    //   }
    // );
    const { email, password } = req.body;
    console.log("new user");
    console.log("email", email);
    console.log("password", password);
    res.status(200).json("success");
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  console.log("🎯 User : ", req.user);
  // console.log("TOKEN AT LOGIN USER", req.user.token);

  // .cookie("jwt", req.user.token, {
  //   expires: new Date(Date.now() + 3600000),
  //   httpOnly: true,
  // })
  res.status(201).json({ id: user.id, role: user.role });
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
