import express from "express";
import jwtAuth from "./../../middleware/jwtAuth.js";
import authorize from "./../../middleware/authorize.js";
import checkPermission from "../commons/permissionMiddleware.js";
import { PermissionKeyEmployee } from "./../utils/permissionList.js";
import {
  createNewProduct,
  getAllProducts,
  getAllProductRequirements,
  approveProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  searchProductByName,
} from "./productController.js";
import productValidate from "./productValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
const router = express.Router();
const routerAdmin = express.Router();
const routerStore = express.Router();
router.use("/store", routerStore);
router.use("/admin", routerAdmin);
routerStore.use(jwtAuth, authorize("manager", "officer"));
routerStore.post(
  "/",
  validateMiddleware(productValidate.postProduct, "body"),
  createNewProduct
);
routerStore.get(
  "/:productId",
  validateMiddleware(productValidate.paramProduct, "params"),
  getProductById
);
routerStore.delete(
  "/:productId",
  validateMiddleware(productValidate.paramProduct, "params"),
  deleteProductById
);
routerStore.patch(
  "/:productId",
  validateMiddleware(productValidate.paramProduct, "params"),
  updateProductById
);
routerStore.get("/all", getAllProducts);
router.get("/", searchProductByName);

routerStore.use(jwtAuth, authorize("admin"));
routerStore.post("/:productId", approveProduct);
routerStore.get("/require", getAllProductRequirements);

export default router;
