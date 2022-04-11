const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");

class StoreModel{
    //@get
    getAllStoreItems(){
        return new Promise((resolve, reject) => {
            const text = textService.readDataFromDb("store.json");
            if(!text){
                reject({
                    message: "no data available!",
                });
            }
            resolve(JSON.parse(text));
        });
    }
    getStoreItemById(itemId){
        return new Promise((resolve, reject) =>{
            const text = textService.readDataFromDb("store.json");
            const data = JSON.parse(text);
            const item = data.store.filter((item) => item.id === itemId)[0];

            if(item){
                resolve(item);
            }else{
                reject({
                    message: "error! no such item found!",
                });
            }
        });
    }

    insertNewStoreItem(item){
        return new Promise((resolve, reject) =>{
            item.id = uuidv4();
            const dbDataText = textService.readDataFromDb("store.json");
            const dbData = JSON.parse(dbDataText);
            dbData.store.push(item);
            console.log(item);
            const dbDataStringified = JSON.stringify(dbData);
            textService.writeDataToDb("store.json", dbDataStringified);
            resolve({
                message: "item sucessfully added",
            });
        });
    }
    deleteStoreItem(itemId){
        return new Promise((resolve, reject) =>{
            const dbDataText = textService.readDataFromDb("store.json");
            const dbData =  JSON.parse(dbDataText);
            
            const filtered = dbData.store.filter((item) => item.id !== itemId);
            dbData.store = filtered;

            const dbDataStringified = JSON.stringify(dbData);
            textService.writeDataToDb("store.json", dbDataStringified);

            resolve({
                message: `item ${itemId} successfully deleted`,
            });
        });
    }
    putStoreItem(id, body){
        return new Promise((resolve, reject) =>{
            const dbDataText = textService.readDataFromDb("store.json");
            const dbData = JSON.parse(dbDataText);

            // dbData.store.forEach((item) =>{
            //     if(item.id === id){
            //         item.price = body.price;
            //         item.brand = body.brand;
            //         item.model = body.model;
            //         item.year = body.year;
            //         item.isRented = body.isRented;
            //     }
            // });
            
      dbData.store.forEach((item) => {
                 if(item.id === id){
                    item.price = body.price;
                    item.brand = body.brand;
                    item.model = body.model;
                    item.year = body.year;
                    item.isRented = body.isRented;
                }
            });


            const stringifiedData = JSON.stringify(dbData);
            textService.writeDataToDb("store.json", stringifiedData);

            resolve({
                message: `item ${id} was updated`,
            })
        });
    }
}

module.exports = StoreModel;