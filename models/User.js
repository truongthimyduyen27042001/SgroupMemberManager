const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  gender: {
    type: Boolean,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

module.exports = new mongoose.model("User", UserSchema)
