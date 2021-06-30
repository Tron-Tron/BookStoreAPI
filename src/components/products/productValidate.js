import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postProduct: Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().required(),
    category: myJoiObjectId().trim().required(),
  }),
  paramProduct: Joi.object({
    productId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
