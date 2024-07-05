require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
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
const path = require("path");
const { Order } = require("./model/Order");

// Jwt OPTIONS

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

//middleware
server.use(express.static(path.resolve(__dirname, "build")));
server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
    // store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    origin: "http://localhost:3000",
    exposedHeaders: ["X-Total-Count"],
  })
);
// // server.use(express.raw({ type: "application/json" }));
// server.use(express.json()); // to parse req.body
server.use((req, res, next) => {
  const contentType = req.headers["content-type"];

  if (contentType && contentType.includes("application/json")) {
    if (req.originalUrl === "/webhook") {
      express.raw({ type: "application/json" })(req, res, next);
    } else {
      express.json()(req, res, next);
    }
  } else {
    next();
  }
});

server.use("/products", isAuth(), productsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), ordersRouter.router);

server.get("*", (req, res) =>
  res.sendFile(path.resolve("build", "index.html"))
);
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
      // console.log("USER ___ :", user);
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
          const token = jwt.sign(
            sanitizeUser(user),
            process.env.JWT_SECRET_KEY
          );
          done(null, { id: user.id, role: user.role, token });
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
        // console.log("User found:", user);
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
const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId } = req.body;

  // Additional metadata for export transactions (if required)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // Convert amount to the smallest currency unit
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Webhook
const endpointSecret = process.env.ENDPOINT_SECRET;

server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    console.log("Web- Hook");
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log({ paymentIntentSucceeded });

        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );
        order.paymentStatus = "received";
        await order.save();
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connection successfully");
  console.log(
    "__________________________________________________________________"
  );
}

server.listen(8080, () => {
  console.log("server Started 8080");
});
