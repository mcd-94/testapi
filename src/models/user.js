// models/user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    healthInsurances: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HealthInsurance" },
    ],
    image: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
