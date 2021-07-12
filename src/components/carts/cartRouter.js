import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import cartValidate from "./cartValidate.js";
import paginationValidate from "./../utils/paginationValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import {
  getCart,
  updatedProduct,
  checkout,
  confirmDelivery,
} from "./cartController.js";
const router = express.Router();
router.use(jwtAuth, authorize("customer"));
router.post(
  "/",
  validateMiddleware(cartValidate.addProduct, "body"),
  updatedProduct
);
router.post(
  "/checkout",
  validateMiddleware(cartValidate.checkout, "body"),
  checkout
);
router.post("/confirm-delivery", confirmDelivery);
router.get(
  "/",
  validateMiddleware(paginationValidate.paging, "query"),
  getCart
);
export default router;
