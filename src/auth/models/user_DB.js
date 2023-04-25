const mongoose = require("mongoose");
const uuid = require("uuid");
const cryptoJs = require("crypto-js");
//creating db
// we can pass 2 things in db , 1st data, 2nd options
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, unique: true },
    name: String,
    email: String,
    ency_password: String,
    salt: String,
  },
  {}
);

UserSchema.virtual("password")
  .set(function (Plainpassword) {
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(Plainpassword);
  })
  .get(function () {});

UserSchema.methods = {
  securePassword: function (Plainpassword) {
    return cryptoJs.SHA256(Plainpassword, this.salt).toString();
  },
  is_authenticate: function (Plainpassword) {
    return this.ency_password === this.securePassword(Plainpassword);
  },
};
const User = new mongoose.model("User", UserSchema);

module.exports = { User };
