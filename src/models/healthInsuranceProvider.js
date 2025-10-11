const HealthInsuranceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default mongoose.models.HealthInsuranceProvider ||
  mongoose.model("HealthInsuranceProvider", HealthInsuranceProviderSchema);
