const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    prescriptionName: { type: String, require: true, minlength: 2, maxlength: 255 },
    sideEffects: { type: String, require: true, minlength: 2, maxlength: 255 }
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

exports.Prescription = Prescription;
exports.prescriptionSchema = prescriptionSchema;