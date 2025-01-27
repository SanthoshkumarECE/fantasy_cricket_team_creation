const express = require("express");
const mongoose = require("mongoose");
const playerRoutes = require("./router/playerRoutes");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())
require("dotenv").config()

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use("/players", playerRoutes);



app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`);

});
