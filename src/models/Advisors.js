import mongoose from "mongoose";

const advisorSchema = new mongoose.Schema({
  username: String,
  password: String,
  price: Number,
  apartmentType: String,
  postalCode: String,
  requests: { type: Array, default: [] },
});

export default mongoose.model("Advisor", advisorSchema);
