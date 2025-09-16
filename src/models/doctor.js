import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  yearsOfExperience: Number,
});

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

