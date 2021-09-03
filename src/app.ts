const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const users = require("./routes/users");
const prescriptions = require("./routes/prescriptions");
const cors = require("cors");
// const auth = require("./routes/auth");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/prescriptions", prescriptions);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});