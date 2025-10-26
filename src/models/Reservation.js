import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    document: { type: String, required: true }, // DNI o documento internacional
    fullName: { type: String, required: true }, // Apellido y nombre del paciente
    turn: { type: mongoose.Schema.Types.ObjectId, ref: "Turn", required: true },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
      required: true,
    },
    healthInsurance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthInsurance",
      required: true,
    },
    totalFee: { type: Number, required: true }, // Calculado según médico y obra social
  },
  { timestamps: true },
);

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
