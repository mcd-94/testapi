// import mongoose from "mongoose";
//
// const DoctorSchema = new mongoose.Schema({
//
// // _id, que asumo que será generado por MongoDB "automaticamente".
//   licenseNumber: Number,
//   name: 
//   {
//     given: {
//     },
//     last: {
//
//     },
//   },
//   specialty: String,
//   description: String,
//   healthInsurances: {
//
//   }// FK from healthInsurances,
//   ,
//
// });
//
// export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
//
  //
import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  // MongoDB automatically generates _id
  licenseNumber: { type: Number, required: true },

  name: {
    given: { type: String, required: true },
    last: { type: String, required: true },
  },

  specialty: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Specialty", // reference to the Specialties collection
    required: true 
  },

  description: { type: String },

  healthInsurances: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "HealthInsurance" // reference to the Health Insurances collection
    }
  ],

  photo: { type: String }, // Base64 string
  consultationFee: { type: mongoose.Decimal128, required: true },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
