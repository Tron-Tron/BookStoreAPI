import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
    },
    price: {
      type: Number,
      require: [true, "price is required"],
    },
    category: {
      type: String,
      require: [true, "category is required"],
    },
    status: {
      type: String,
      enum: ["waiting", "confirmed", "deleted"],
      require: [true, "status is required"],
      default: "waiting",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      require: [true, "store is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
ProductSchema.virtual("category_detail", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true,
});

export const Product = mongoose.model("Product", ProductSchema);
