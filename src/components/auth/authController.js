import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import SuccessResponse from "../utils/successResponse.js";
import { userService } from "./../users/userService.js";
import jwt from "jsonwebtoken";
import User from "./../users/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import { cartService } from "../carts/cartService.js";
export const register = asyncMiddleware(async (req, res, next) => {
  const { username, phoneNumber, balance, password } = req.body;
  const auth = await userService.create({
    username,
    phoneNumber,
    balance,
    password,
  });
  await cartService.create({ user: auth._id });
  return new SuccessResponse(201, auth).send(res);
});
export const login = asyncMiddleware(async (req, res, next) => {
  const { username, password } = req.body;
  const isExistName = await userService.findOne({ username });
  if (!isExistName) {
    throw new ErrorResponse(404, "User is not found");
  }
  const isMatchPassword = await User.comparePassword(
    password,
    isExistName.password
  );
  if (!isMatchPassword) {
    throw new ErrorResponse(404, "Password is incorrect");
  }
  const token = jwt.sign(
    {
      _id: isExistName._id,
      username: isExistName.username,
      roles: isExistName.roles,
      storeId: isExistName.storeId,
    },
    process.env.JWT_KEY
  );
  return new SuccessResponse(200, token).send(res);
});
