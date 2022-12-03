const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  like: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("blog", BlogSchema);
