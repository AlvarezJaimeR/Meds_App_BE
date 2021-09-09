const { User } = require("../jsmodels/user");
const express = require("express");
const { Prescription } = require("../jsmodels/prescription");
const router = express.Router();

//get all users
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      return res.send(users);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;