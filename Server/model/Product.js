const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "price should be greater then -1"],
    max: [100000, "price should be less then 1,00,000"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, "discountPercentage should be greater then zero"],
    max: [99, "discountPercentage should be less then 100"],
  },
  rating: {
    type: Number,
    max: [5, "rating max 5"],
    // default: 0,
    required: true,
  },
  stock: {
    type: Number,
    min: [0, "stock min 0"],
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
