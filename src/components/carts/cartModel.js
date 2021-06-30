import mongoose from "mongoose";
import geocoder from "./../utils/geocoder.js";
const { Schema } = mongoose;
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: [true, "user is required"],
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        amountCart: {
          type: Number,
          required: [true, "amount is required"],
          default: 0,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "wallet"],
      default: "wallet",
    },
    deliveryAddress: {
      type: String,
      required: function () {
        if (this.paymentMethod === "cod") {
          return true;
        }
        return false;
      },
      default: " ",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
    total: {
      type: Number,
      require: [true, "total is required"],
      default: 0,
    },
    status: {
      type: Boolean,
      require: [true, "status is required"],
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
CartSchema.pre("findOneAndUpdate", async function (next) {
  const loc = await geocoder.geocode(this.deliveryAddress);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  next();
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
