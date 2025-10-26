import mongoose from "mongoose";

const TurnSchema = new mongoose.Schema(
  {
    doctor: { type: String, required: true },
    dateTime: { type: Date, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.Turn || mongoose.model("Turn", TurnSchema);
