const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  username: String,
  state: String,
  gender: String,
  age: Number,
  registered: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
  premiumExpiry: Date,
  aiCountToday: { type: Number, default: 0 },
  banned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
