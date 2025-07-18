const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  currentStudies: { type: String,  required: true },
  subOption: { type: String }, // dynamic dropdown based on currentStudies
  state: { type: String, required: true },
  district: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  howYouGotToKnow: { type: String, enum: ["social media", "word of mouth", "other"], required: true }
});

module.exports = mongoose.model("User", userSchema);
