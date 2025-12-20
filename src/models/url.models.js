import mongoose, { Schema } from "mongoose";
import Hashids from "hashids";

const urlSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId type
      ref: "User", // Reference to the User model
      required: false,
    },
    long_url: {
      type: String,
      required: true,
    },
    short_code: {
      type: String,
      unique: true,
    },
    expireAt: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
      index: { expireAfterSeconds: 0 },
    },
  },
  { timestamps: true },
);

const hashids = new Hashids(process.env.SECRET_SALT, 6);

urlSchema.pre("save", function (next) {
  if (!this.short_code) {
    const shortCode = hashids.encodeHex(this._id.toString());
    this.short_code = shortCode;
  }
  next();
});

export const Url = mongoose.model("Url", urlSchema);
