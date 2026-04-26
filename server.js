import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";


dotenv.config();

// const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// connecting mongo
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("connected to mongodb succesfully"))
.catch((error) => console.log("Error while connecting to mongodb", error));

//basic middleware
app.use(express.json());

//connecting routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/jobs", jobRoutes)

app.get('/', (req, res) => {
    res.send("The job tracker backend is live")
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
});
