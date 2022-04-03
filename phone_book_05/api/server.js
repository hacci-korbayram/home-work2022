const express = require("express");
const fileSystem = require("./db/file-system");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/user", (req, res, next) => {
    let userStringData = fileSystem.getData("user.json");

    let user = JSON.parse(userStringData);

    if (req.query.pageSize) {
        user = user.slice(0, parseInt(req.query.pageSize));
    }

    if (req.query.sortBy) {
        user.sort((first, second) =>
            first[req.query.sortBy].localeCompare(second[req.query.sortBy])
        );
    }
    res.send(user);
});

app.get("/user/:id", (req, res, next) => {
    const id = req.query.id
    const users = JSON.parse(fileSystem.getData("user.json"));
    const user = users.find((user) => user.id === id);
    if (!user) {
        throw new Error("user not found!");
    }

    res.send(user);
});
//POST does Insert
app.post("/user",(req, res, next)=>{
    console.log(req, body);
    
    const user = {
        imgSrc: req.body.imgSrc,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        id: uuidv4()
    };

    fileSystem.addData(user, "user.json");
    res.send({
        message: "thanks for your input",
    });
});



// Simple GET request
app.get("/", (req, res, next) => {
    const contactImage = fileSystem.getData("contact-images.json");
    res.send(contactImage);
});

// Delete request
app.delete("/user/:id", (req, res, next) => {
    const id = req.params.id;
    fileSystem.deleteData(id, "user.json");
    res.send(
        JSON.stringify({
            id: id,
            deleted: true,
        })
    )
})
app.put("/user/:id", (req, res, next) => {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = fileSystem.updateData(id, user, "user.json");
    res.send(updatedUser);
});

const PORT = process.env.PORT || 500;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, () => {
    console.log("Server is listening http://localhost:500");
});  