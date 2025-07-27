const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must Have A Name "],
  },
  email: {
    type: String,
    required: [true, "user must Have A Name "],
    unique: true,
    lowercase: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "writer", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please Provide a  Password ! "],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: 8,
    required: [true, "please confirm your password  "],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password are not the same !",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  password,
  currentPassword
) {
  return await bcrypt.compare(password, currentPassword);
};

module.exports = mongoose.model("User", userSchema);
