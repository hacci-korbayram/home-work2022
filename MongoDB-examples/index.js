require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb");

const { getDb, connectToDatabase } = require("./db/mongo-connection");

const app = express();
app.use(express.json());

//1.get all resource
app.get("/", async (req, res) => {
    try {
        const database = getDb();
        const cars = database.collection("cars");

        const dbPointer = await cars.find({});

        const data = await dbPointer.toArray();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


//2.get resource by id
app.get("/:id", async (req, res) => {
    try {
        const carId = req.params.id;
        const database = getDb();
        const cars = database.collection("cars");

        const car = await cars.findOne({ _id: new ObjectId(carId) });


        if (!car) return res.status(404).send({ message: "not found" });

   

        res.status(200).send(car);
    } catch (error) {
        res.stauts(400).send(error);
    }
});

//3.creating a resoruce 
app.post("/", async (req, res) => {
    try {
        const carData = req.body;
        const database = getDb();
        const cars = database.collection("cars");

        const response = await cars.insertOne(carData);
        console.log(response);
    } catch (error) {

    }
});

//4.updating a resource using put
app.put("/:id", async (req, res) => {
    try {
        const carId = req.params.id;
        const updatedCar = req.body;

        const database = getDb();
        const cars = database.collection("cars");
        // const response = await products.replaceOne(
        //   { _id: new ObjectId(productId) },
        //   updatedProduct
        // );

        const response = await cars.findOneAndReplace(
            { _id: new ObjectId(carId) },
            updatedCar,
            {
                returnDocument: "after",
            }
        );
        console.log(response.value);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
//5, updating a resource using patch
app.patch("/:id", async (req, res) => {
    try {
        const carId = req.params.id;
        const updates = req.body;

        const database = getDb();
        const cars = database.collection("cars");

        const response = await cars.updateOne(
            { _id: new ObjectId(carId) },
            {
                $set: updates,
            }
        );
        if (response.modifieldCount === 0 || response.matchedCount === 0)
            return res.status(400).send({ message: "update failed" });

        // const response = await products.findOneAndUpdate(
        //   { _id: new ObjectId(productId) },
        //   {
        //     $set: updates,
        //   }
        // );

        console.log(response);
        res.status(200).send(response);
        //res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

//6.deleting a response
app.delete("/:id", async (req, res)=>{
    try {
           const carId = req.params.id;
           const database = getDb();
           const cars = database.collection("cars");
           const response = await cars.deleteOne({_id: new ObjectId(carId)});
           
           if(response.deleteCount === 0)
           return res.status(404).send({msg: "car not found"});

           res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
});
app.listen(3000, () => {
    connectToDatabase();
    console.log("Server is listening at port 3000");
});