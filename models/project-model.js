import mongoose from "mongoose";

const WebsiteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  main: { type: Boolean, default: false },
});
const uiuxSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  main: { type: Boolean, default: false },
});
const mobileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  main: { type: Boolean, default: false },
});
const fullstackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  main: { type: Boolean, default: false },
});

const Website = mongoose.model("Website", WebsiteSchema);
const UIUX = mongoose.model("UIUX", uiuxSchemaSchema);
const Mobile = mongoose.model("Mobile", mobileSchema);
const Fullstack = mongoose.model("Fullstack", fullstackSchema);
export { Website, UIUX, Mobile, Fullstack };
