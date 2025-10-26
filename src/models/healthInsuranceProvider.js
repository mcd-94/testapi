import mongoose from "mongoose";

const HealthInsuranceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export default mongoose.models.HealthInsurance ||
  mongoose.model("HealthInsurance", HealthInsuranceSchema);
