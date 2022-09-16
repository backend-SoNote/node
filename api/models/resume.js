const mongoose = require("mongoose");

const { Schema } = mongoose;

const resumeScheme = new Schema(
  {
    name: {
      type: String,
    },
    uid: {
      type: String,
    },
    provider: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { collection: "resumes" }
);

module.exports = mongoose.model("resumes", resumeScheme);
