// comment
import mongoose from "mongoose";

const SpecialtySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Specialty ||
  mongoose.model("Specialty", SpecialtySchema);
