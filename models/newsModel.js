const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
