const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "a article must have title"],
    trim: true,
  },
  ratting: {
    type: Number,
    default: 4.8,
  },
  image: String,
  summary: {
    type: String,
    required: [true, "a article must have a summary"],
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Article", articleSchema);
