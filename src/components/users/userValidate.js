import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postUser: Joi.object({
    username: Joi.string().required(),
    balance: Joi.number(),
    phoneNumber: Joi.string()
      .trim()
      .pattern(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im)
      .required(),
    password: Joi.string().required(),
  }),
  loginUser: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  paramUser: Joi.object({
    userId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
