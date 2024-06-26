const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    // Create a new product instance using the request body
    const product = new Product(req.body);

    // Save the product to the database
    const doc = await product.save();

    // Log the saved document and send a successful response
    console.log({ doc });
    res.status(201).json(doc);
  } catch (err) {
    // Log any errors and send an error response
    console.log({ err });
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }

  const totalDocs = await totalProductsQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const doc = await query.exec();
    res.set("X-Total-Count", totalDocs);
    // console.log({ doc });
    res.status(201).json(doc);
  } catch (err) {
    // Log any errors and send an error response
    console.log({ err });
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
};
