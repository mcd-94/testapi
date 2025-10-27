// models/doctor.js

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    licenseNumber: { type: Number, required: true },
    phone: { type: String },
    email: { type: String },
    specialty: [{ type: mongoose.Schema.Types.ObjectId, ref: "Specialty" }],
    healthInsurances: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HealthInsurance" },
    ],
    description: { type: String },
    consultationFee: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
