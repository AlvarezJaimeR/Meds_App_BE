export { };

const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered");

        const salt = await bcrypt.genSalt(10);

        user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
        });

        await user.save();

        const { password, ...sendUser } = user._doc;

        const token = user.generateAuthToken();

        console.log(res);
        return res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(sendUser);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;
