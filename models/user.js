let mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    profilePicture: { type: String, default:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
