const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  username: { type: String},
  phone: { type: String},
  house_name: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
},
{ timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  billing_address: [addressSchema],
  image: { type: String },
  role: { type: String, default: "user" },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
