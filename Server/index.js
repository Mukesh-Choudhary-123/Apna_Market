const express = require("express");
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const server = express();
const cors = require("cors");
const port = 8080;

//middleware
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ApnaMarket");
  console.log("Database connection successfully");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(port, () => {
  console.log("server listening on port " + port);
});
