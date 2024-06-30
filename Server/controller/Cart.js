const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  console.log(`Fetching user in Cart 🛒🛒🛒 = `, id);
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.user;
  console.log(" addToCart ID := ", id);
  // console.log(req.body);
  const { product, quantity } = req.body;

  if (!product || !quantity) {
    return res.status(400).json({
      error: "Product and quantity are required.",
    });
  }
  const cart = new Cart({ ...req.body, user: id });
  console.log("cart := ", cart);
  try {
    const doc = await cart.save();
    console.log("cart.save", doc);
    const result = await doc.populate("product");
    console.log("result", result);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error gentrating here ..", { error });
    res.status(400).json(error);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (error) {
    console.log({ error });
    res.status(400).json(error);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate("product");
    res.status(200).json(result);
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};
