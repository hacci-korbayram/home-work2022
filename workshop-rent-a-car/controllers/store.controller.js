const StoreModel = require("../models/store.model");
const storeModel  = new StoreModel();

class StoreController{
    fetchAllStoreItems(){
        return storeModel.getAllStoreItems();
    }
    
    fetchStoreItemById(itemId){
        return storeModel.getStoreItemById(itemId);
    }

    postStoreItem(item){
        return storeModel.insertNewStoreItem(item);
    }

    deleteStoreItem(itemId){
        return storeModel.deleteStoreItem(itemId);
    }
    
    updateStoreItem(id, body) {
        return storeModel.putStoreItem(id, body);
      }
    }
module.exports = StoreController;