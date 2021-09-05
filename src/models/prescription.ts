export { };

const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");

const prescriptionSchema = new mongoose.Schema({
    prescriptionName: { type: String, require: true, minlength: 2, maxlength: 255 },
    sideEffects: { type: String, require: true, minlength: 2, maxlength: 255 },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

function validatePrescription(prescription) {
    const schema = Joi.object({
        sideEffects: Joi.string().min(2).max(255).required(),
        prescriptionName: Joi.string().min(2).max(255).required()
    });
    return schema.validate(prescription);
}

const Prescription = mongoose.model("Prescription", prescriptionSchema);

exports.Prescription = Prescription;
exports.validatePrescription = validatePrescription;
exports.prescriptionSchema = prescriptionSchema;
