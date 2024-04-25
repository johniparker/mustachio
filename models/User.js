const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  //associate user with one or more favorite styles
  favoriteStyles: [
    {
      type: Schema.Types.ObjectId,
      ref: "MustacheStyle",
    },
  ],
});

//pre-save hook for setting password
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

userSchema.methods.validatePassword = function (enteredPassword) {
  // bcrypt.compare returns true if the passwords match, false otherwise
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.checkEmailUnique = async function (email) {
  const user = await this.findOne({ email: email });
  // Return true if we don't find an existing user with the email address, false otherwise
  return !Boolean(user);
};

module.exports = mongoose.model("User", userSchema, "users");
