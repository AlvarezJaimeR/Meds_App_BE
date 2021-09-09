const mongoose = require("mongoose");
const { Prescription } = require("./prescription");

const userSchema = new mongoose.Schema({
    userName: { type: String, require: true, minlength: 2, maxlength: 255 },
    email: { type: String, require: true, minlength: 2, maxlength: 255 },
    password: { type: String, require: true, minlength: 3, maxlength: 1024 },
    prescription: [Prescription.schema]
});

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;