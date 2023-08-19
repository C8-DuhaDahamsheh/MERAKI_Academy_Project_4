const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const mongodb = require("./models/db")
const app = express();
const userRouter = require("./routes/users")
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users" , userRouter)


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));





app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
