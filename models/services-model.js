import mongoose from "mongoose";

const servicesSchema = mongoose.Schema({
  title: { type: String, required: true },
  services: { type: String, unique: true },
});

const Service = mongoose.model("Service", servicesSchema);
export default Service;
