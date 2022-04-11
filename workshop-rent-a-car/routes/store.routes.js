const router = require("express").Router();
const StoreController = require("../controllers/store.controller");

// This subroute will direct the request to the appropriate controller middleware function

// http://localhost:5000/api/animals
// http://localhost:5000/api/animals/1
// METHOD: @GET

router.get("/:id?", (req, res) => {
    if (req.params && req.params.id) {
      // the name of the query param in the route will define the name of the property in req.params
      // So for example :/email? it means req.params.email
        const itemId = req.params.id;
        storeController
        .fetchStoreItemById(itemId)
        .then((item) => {
            res.status(200).json(item);
        })
        .catch((error) =>{
            res.status(404).json(error);
        });
    }else{
        storeController
        .fetchAllStoreItems()
        .then((items)=>{
            res.status(200).json(items);
        })
        .catch((error) =>{
            res.status(400).json(error);
        });
    }
});

router.post("/", (req, res) =>{
    const item = req.body;
    storeController.postStoreItem(item).then((response) =>{
        res.status(200).json(response);
    });
});

router.delete("/:id?",(req, res)=>{
    const id = req.params.id;

    if(!id){
        res.status(400).json({
            msg:"error! you didn't provide an ID!",
        });
    }else{
        storeController.deleteStoreItem(id).then((response)=>{
            res.status(200).json(response);
        });
    }
});

router.put("/:id?",(req, res) =>{
    const itemId = req.params.id;
    const updateItem = req.body;

    if(!itemId || !updateItem){
        res.status(400).json({
            message: "insufficient data! connot update",
        });
    }else{
        storeController
        .updateStoreItem(itemId, updateItem)
        .then((response) => {
            res.status(200).json(response);
        });
    }
});


const storeController = new StoreController();
module.exports = router;