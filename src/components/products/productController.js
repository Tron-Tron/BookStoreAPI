import asyncMiddleware from "../../middleware/asyncMiddleware.js";

import SuccessResponse from "../utils/SuccessResponse.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { categoryService } from "../categories/categoryService.js";
import { productService } from "./productService.js";

export const createNewProduct = asyncMiddleware(async (req, res, next) => {
  const { name, price, category } = req.body;
  const store = req.user.storeId;
  const checkCategory = await categoryService.findOne({
    _id: category,
    status: "confirmed",
    store,
  });
  if (!checkCategory) {
    throw new ErrorResponse(400, "Category is not exist");
  }
  const isExistProduct = await productService.findOne({
    name,
    store,
    status: "confirmed",
  });

  if (isExistProduct) {
    throw new ErrorResponse(400, `${name} is exist`);
  }
  const createdProduct = await productService.create({
    name,
    price,
    category,
    store,
  });
  return new SuccessResponse(200, createdProduct).send(res);
});
export const approveProduct = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productService.findOneAndUpdate(
    { _id: productId, status: "waiting" },
    { status: "confirmed" }
  );
  if (!product) {
    throw new ErrorResponse(400, `No requirement has id ${productId}`);
  }
  return new SuccessResponse(200, "Requirement Product is accepted").send(res);
});
export const rejectCategory = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryService.findOneAndDelete({
    _id: categoryId,
    status: "waiting",
  });
  if (!category) {
    throw new ErrorResponse(400, `No requirement has id ${categoryId}`);
  }
  return new SuccessResponse(200, "Requirement Category is rejected").send(res);
});
export const getAllProductRequirements = asyncMiddleware(
  async (req, res, next) => {
    const products = await productService.getAll({ status: "waiting" });
    if (!products.length) {
      throw new ErrorResponse(400, "No products");
    }
    return new SuccessResponse(400, products).send(res);
  }
);
export const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const storeId = req.user.storeId;
  const products = await productService.getAll(
    { store: storeId, status: "confirmed" },
    null,
    "category_detail"
  );
  if (!products.length) {
    throw new ErrorResponse(400, "No Products");
  }
  return new SuccessResponse(200, products).send(res);
});

export const getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const storeId = req.user.storeId;
  const product = await productService.findOne(
    { _id: productId, store: storeId, status: "confirmed" },
    null,
    "category_detail"
  );

  if (!product) {
    throw new ErrorResponse(400, `No product has id ${productId}`);
  }
  return new SuccessResponse(200, product).send(res);
});

export const deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const storeId = req.user.storeId;
  if (!productId.trim()) {
    throw new ErrorResponse(400, "productId is empty");
  }
  const deletedProduct = await productService.findOneAndUpdate(
    {
      _id: productId,
      store: storeId,
    },
    { status: "deleted" }
  );
  if (!deletedProduct) {
    throw new ErrorResponse(400, `No product has id ${productId}`);
  }
  return new SuccessResponse(200, "Delete Successfully").send(res);
});

export const updateProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const storeId = req.user.storeId;
  const updatedProduct = await productService.findOneAndUpdate(
    { _id: productId, store: storeId, status: "confirmed" },
    req.body,
    { new: true }
  );
  if (!updatedProduct) {
    throw new ErrorResponse(404, `No product has id ${productId}`);
  }
  return new SuccessResponse(200, updatedProduct).send(res);
});
export const searchProductByName = asyncMiddleware(async (req, res, next) => {
  const { keyName } = req.query;
  const storeId = req.user.storeId;
  const productArr = await productService.getAll(
    { store: storeId, status: "confirmed" },
    "name"
  );
  const searchedProduct = productArr.filter((value) => {
    return (
      value.productName.toLowerCase().indexOf(keyName.toLowerCase()) !== -1
    );
  });
  if (searchedProduct.length === 0) {
    throw new ErrorResponse(400, "No Products");
  }
  return new SuccessResponse(200, searchedProduct).send(res);
});
