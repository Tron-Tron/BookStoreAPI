import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import cartValidate from "./cartValidate.js";
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
router.post("/checkout", checkout);
router.post("/confirm-delivery", confirmDelivery);
router.get("/", getCart);
export default router;
