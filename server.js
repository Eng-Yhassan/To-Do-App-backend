const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

// Routers
const taskRoute = require("./routes/taskRoute")

const app = express();

app.use(express.json(), cors());

// MongoDB Connection
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("Atlas Is working");
})
.catch(err => console.error("Mongo connection error:", err));


app.use(taskRoute)

// Server Listener
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`The Connection Is Working at the port of ${PORT}`);
});
