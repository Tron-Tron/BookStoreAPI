import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import mongoose from "mongoose";
import ErrorResponse from "../utils/errorResponse.js";
import SuccessResponse from "../utils/successResponse.js";
import { storeService } from "./storeService.js";

export const addStore = asyncMiddleware(async (req, res, next) => {
  const { name, address } = req.body;
  const savedStore = await storeService.create({
    name,
    address,
  });
  return new SuccessResponse(200, savedStore).send(res);
});

export const getAllStores = asyncMiddleware(async (req, res, next) => {
  const stores = await storeService.getAll();
  if (!stores.length) {
    throw new ErrorResponse(400, "No Stores");
  }
  return new SuccessResponse(200, stores).send(res);
});
export const getStoreById = asyncMiddleware(async (req, res, next) => {
  const { storeId } = req.params;
  const store = await storeService.findById(storeId);
  if (!store) {
    throw new ErrorResponse(400, `No staff has id ${storeId}`);
  }
  return new SuccessResponse(200, store).send(res);
});

export const updateStoreById = asyncMiddleware(async (req, res, next) => {
  const { storeId } = req.params;
  if (!storeId.trim()) {
    throw new ErrorResponse(400, "storeId is empty");
  }
  const updatedStore = await storeService.findOneAndUpdate(
    { _id: storeId },
    req.body,
    { new: true }
  );
  if (!updatedStore) {
    throw new ErrorResponse(400, `No staff has id ${storeId}`);
  }
  return new SuccessResponse(200, updatedStore).send(res);
});

export const deleteStoreById = asyncMiddleware(async (req, res, next) => {
  const { storeId } = req.params;
  const deletedStore = await storeService.findOneAndUpdate(
    { _id: storeId },
    { status: "paused" },
    { new: true }
  );
  if (!deletedStore) {
    throw new ErrorResponse(404, "No store");
  }
  return new SuccessResponse(200, `Deleted Store has id ${storeId}`).send(res);
});
