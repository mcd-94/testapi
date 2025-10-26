// models/doctor.js

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    licenseNumber: { type: Number },
    description: { type: String },
    email: { type: String },
    phone: { type: String },
    specialty: [{ type: mongoose.Schema.Types.ObjectId, ref: "Specialty" }],
    healthInsurances: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HealthInsurance" },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
