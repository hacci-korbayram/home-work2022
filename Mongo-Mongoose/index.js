require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const globalRouter = require("./const/router.const");

const app = express();

app.use(express.json());
app.use("/api", globalRouter);

const MONGO_URI = `mongodb+srv://hacci11:hacci11@cluster0.te8h4.mongodb.net/adv-node?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, err => {
    if (err) return console.log(err);

    console.log("connected to MongoDB");

    app.listen(process.env.PORT, process.env.HOST, () => {
        console.log(`Server is up at port: ${process.env.PORT}`);
    });
});
