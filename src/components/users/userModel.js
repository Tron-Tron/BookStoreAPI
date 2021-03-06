import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      // required: [true, "phone is required"],
    },
    balance: {
      type: Number,
      required: [true, "balance is required"],
      default: 0,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: String,
      required: [true, "roles is required"],
      enum: ["admin", "manager", "officer", "cashier", "shipper", "customer"],
      default: "customer",
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
const User = mongoose.model("User", UserSchema);
export default User;
