const express = require("express");
const mongoose = require("mongoose");
const server = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const port = 8080;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const cookieParser = require("cookie-parser");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { User } = require("./model/User");
const { isAuth, sanitizeUser, cookieExtractor } = require("./Services/common");

// Jwt OPTIONS
const SECRET_KEY = "SECRET_KEY";
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

//middleware
server.use(express.static("build"));
server.use(cookieParser());
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
    // store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", isAuth(), productsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), ordersRouter.router);

// passport Strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      console.log("I AM IN THE LOCAL STRATEGY");
      console.log("Email : ", email);
      console.log("Password : ", password);
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "invalid credentials" });
      }
      console.log("USER ___ :", user);
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done({ message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, { id: user.id, role: user.role });
          console.log("LocalStrategy token: ", token);
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("jwt_payload -->", jwt_payload.id);
    try {
      console.log("I AM IN THE JWT STRATEGY");

      const user = await User.findById(jwt_payload.id);
      if (user) {
        console.log("User found:", user);
        return done(null, sanitizeUser(user));
      } else {
        console.log("YOU ARE NOT USER !!");
        return done(null, false);
      }
    } catch (err) {
      console.error("Error during JWT authentication:", err);
      return done(err, false);
    }
  })
);

// this create session variable req.user
passport.serializeUser(function (user, cd) {
  process.nextTick(function () {
    return cd(null, { id: user.id, role: user.role });
  });
});

// // this create session variable req.user on begin called from callback
// passport.serializeUser(function (user, cd) {
//   process.nextTick(function () {
//     return cd(null, {
//       id: user.id,
//       username: user.username,
//       picture: user.picture,
//     });
//   });
// });

// this changes session variable req.user when called from authenticated request
passport.deserializeUser(function (user, cd) {
  process.nextTick(function () {
    return cd(null, user);
  });
});

// Payments

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51PKIOnSEQs1HpBFMUBsZK1cTSa7fPW4fedMbelEzW8aMzO4bdD8lK4xhZgzTI9dwbi5M8H2ch8dChBCvjV7riwEP00ddknnS1i"
);

server.post("/create-payment-intent", async (req, res) => {
  try {
    const { totalAmount } = req.body;

    // Additional metadata for export transactions (if required)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert amount to the smallest currency unit
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        business_name: "Your Business Name", // Add any additional metadata required by Stripe for compliance
        export_reason: "Selling Goods/Services", // Example: "Selling Goods/Services"
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ApnaMarket");
  console.log("Database connection successfully");
}

// server.get("/", (req, res) => {
//   res.json({ status: "success" });
// });

server.listen(port, () => {
  console.log("server listening on port " + port);
});
