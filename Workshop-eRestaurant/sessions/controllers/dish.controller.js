const DishModel = require("../models/dish.model");


class DishController{
   //1. Fetch all dish
    static async fetchAllDishs(req, res){
        try {
            const dishs = await DishModel.getAllDishs();
            res.status(200).send(dishs);
        } catch (error) {
            res.status(400).send(error);
        }
    }
 //2. Fetch dish by id
    static async fetchDishById(req, res){
        try {
            const {id: dishId} = req.params;

            const dish = await DishModel.getDishById(dishId);
            res.status(200).send(dish);
        } catch (error) {
            res.status(400).send(error);
        }
    }
  //3. Add new dish create new routerden
    static async createNewDish(req, res) {
        try {
            const newDishData = req.body;

            const createdDish = await DishModel.addNewDish(newDishData);

            res.status(201).send(createdDish);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    //4. Update dish
    static async updateDish(req, res){
        try {
            const dishId = req.params.id;
            const dishUpdates = req.body;

            if(dishUpdates.id)res.status(400).send({msg: "invalid update"});

            await DishModel.patchDish(dishId, dishUpdates);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }

  //5. Delete dish
    static async deleteDish(req, res) {
        try {
            const dishId = req.params.id;
            await DishModel.deleteDish(dishId);
            res.status(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = DishController;