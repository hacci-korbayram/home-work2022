require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const globalRouter = require("./const/router.const");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.te8h4.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use(helmet());

app.use(globalRouter);

mongoose.connect(MONGO_URI, err =>{
    if(err) return console.log(err);

    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, process.env.HOST, () =>{
        console.log(`server is up at port: ${process.env.PORT}`);
    });
});

