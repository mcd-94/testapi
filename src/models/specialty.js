const specialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Specialty =
  mongoose.models.Specialty || mongoose.model("Specialty", specialtySchema);
