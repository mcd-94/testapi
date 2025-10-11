// import mongoose from "mongoose";
//
// const shiftSchema = new mongoose.Schema({
//   // MongoDB automatically generates _id
//
//   doctor: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Doctor", // reference to the Doctors Collection
//     required: true 
//   },
//
//   dateTime: { type: Date }, // date?
//
//   available: {type: Boolean}
// });
//
// export default mongoose.models.Shift || mongoose.model("Shift", ShiftSchema);
//
//
import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  // MongoDB automatically generates _id

  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor", // reference to the Doctors collection
    required: true 
  },

  dateTime: { 
    type: Date, 
    required: true 
  },

  available: { 
    type: Boolean, 
    default: true 
  }
});

export default mongoose.models.Shift || mongoose.model("Shift", shiftSchema);

