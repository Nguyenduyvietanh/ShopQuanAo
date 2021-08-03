import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      strim: true,
      maxLength: 32,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      maxLength: 2000,
    },
    price: {
      type: Number,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      type: String
    },
    shipping: {
      required: false,
      type: Boolean,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
