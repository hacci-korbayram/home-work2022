const MONGO_URI = `mongodb+srv://hacci11:hacci11@cluster0.te8h4.mongodb.net/renta-car?retryWrites=true&w=majority`;
const {MongoClient} = require("mongodb");

const client = new MongoClient(MONGO_URI);

let dbConnection;

module.exports ={
    connectToDatabase(){
        client.connect((error, mongoClient) => {
            if(error || !mongoClient){
                return console.log(error);
            }
            dbConnection = mongoClient.db();
            console.log("connected to MongoDb");
        });
    },
    getDb(){
        return dbConnection;
    },
};