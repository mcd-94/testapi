// models/appointment.js

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // referencia al modelo Doctor
      required: true,
    },
    dateTime: {
      type: Date, // guarda fecha y hora exacta del turno
      required: true,
    },
    durationMinutes: {
      type: Number,
      default: 30, // duración estándar del turno
      min: 5,
      max: 120,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  },
);

// índice para evitar solapamientos por médico + fecha
appointmentSchema.index({ doctor: 1, dateTime: 1 }, { unique: true });

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
