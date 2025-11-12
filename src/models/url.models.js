import mongoose from "mongoose";

const urlSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId type
    ref: "User", // Reference to the User model
    required: true,
  },
  long_url: {
    type: String,
    required: true,
  },
  short_code: {
    type: String,
    required: true,
    unique: true,
  },
  timestamps: true,
});
