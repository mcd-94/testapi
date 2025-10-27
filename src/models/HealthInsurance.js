import mongoose from "mongoose";

const HealthInsuranceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.HealthInsurance ||
  mongoose.model("HealthInsurance", HealthInsuranceSchema);
