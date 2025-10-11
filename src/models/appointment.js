import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },

    shift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
      required: true,
    },

    healthInsuranceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthInsuranceProvider",
      required: true,
    },

    totalAmount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
