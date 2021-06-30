import mongoose from "mongoose";
import geocoder from "./../utils/geocoder.js";
const { Schema } = mongoose;
const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
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
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["active", "disabled", "paused"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
StoreSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  next();
});

const Store = mongoose.model("Store", StoreSchema);
export default Store;
