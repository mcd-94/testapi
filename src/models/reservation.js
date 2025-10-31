import mongoose from "mongoose";
// something
const ReservationSchema = new mongoose.Schema(
  {
    dni: { type: Number, required: true },
    patientName: { type: String, required: true },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
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
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    totalAmount: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
