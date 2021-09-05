export { };

const { User, validateUser } = require("../models/user");
const { Prescription, validatePrescription } = require("../models/prescription");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        return res.send(prescriptions);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validatePrescription(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let prescription = await Prescription.findOne({ email: req.body.prescriptionName });
        if (prescription) return res.status(400).send("Prescription already registered");

        const salt = await bcrypt.genSalt(10);

        prescription = new Prescription({
            prescriptionName: req.body.prescriptionName,
            sideEffects: req.body.sideEffects,
            _user: await User.findOne({name: req.params.username})
        });

        await prescription.save();

        console.log(res);
        return res
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;