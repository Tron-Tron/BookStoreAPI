import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postStore: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
  }),
  paramStore: Joi.object({
    storeId: myJoiObjectId().trim().required(),
  }),
};
export default schemas;
