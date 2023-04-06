const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    require: false,
  },
});

module.exports = new mongoose.model("Todo", TodoSchema);
