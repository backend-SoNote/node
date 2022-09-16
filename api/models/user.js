const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    uid: String,
    provider: String,
    email: String,
    role: String,
  })
);

module.exports = User;
