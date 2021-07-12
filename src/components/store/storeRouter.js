import express from "express";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
import validateMiddleware from "./../commons/validateMiddleware.js";
import storeValidate from "./storeValidate.js";
import {
  addStore,
  updateStoreById,
  deleteStoreById,
  getStoreById,
  getAllStores,
} from "./storeController.js";
import paginationValidate from "./../utils/paginationValidate.js";
const router = express.Router();
router.use(jwtAuth, authorize("admin"));
router.post("/", validateMiddleware(storeValidate.postStore, "body"), addStore);
router.get(
  "/all",
  validateMiddleware(paginationValidate.paging, "query"),
  getAllStores
);
router.get(
  "/:storeId",
  validateMiddleware(storeValidate.paramStore, "params"),
  getStoreById
);
router.patch(
  "/:storeId",
  validateMiddleware(storeValidate.paramStore, "params"),
  updateStoreById
);
router.delete(
  "/:storeId",
  validateMiddleware(storeValidate.paramStore, "params"),
  deleteStoreById
);

export default router;
