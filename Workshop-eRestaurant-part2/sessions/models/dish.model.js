const path = require("path");
const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");


const dishsPath = path.join(__dirname, "..", "data", "dish.json");

class DishModel {
    static async getAllDishs() {
        return DataService.readJSONFile(dishsPath);

    }
    static async getDishById(dishId) {
        const dishs = await this.getAllDishs();

        const foundDish = dishs.find(dish => dish.id === dishId);

        if (foundDish) {
            return foundDish;
        } else {
            return Promise.reject({ msg: "no dish found" });

        }
    }
    static async addNewDish(newDishData) {
        const dishs = await this.getAllDishs();

        const nameExists = dishs.some(dish => dish.name === newDishData.name  
  );

        if(nameExists) return Promise.reject({ msg: "registered"});
        

        const newDish = {
            id: uuid(),
            ...newDishData,
        };
        if (newDish.price <= 1 || newDish.price >= 1000) {
            return Promise.reject({
              msg: 'There can be no price less than 1 and more than 1000'
            });
          }
        const updatedDishs = [...dishs, newDish];

        await DataService.saveJSONFile(dishsPath, updatedDishs);

        return newDish;
    }
    static async patchDish(dishId, dishUpdateData) {
        const dishs = await this.getAllDishs();

        const foundDish = await this.getDishById(dishId);
        
        const updatedDish = {...foundDish, ...dishUpdateData};

        const updateDishs = dishs.map(dish => 
            dish.id === foundDish.id ? updatedDish : dish
        );
        await DataService.saveJSONFile(dishsPath, updateDishs);
    }
    static async deleteDish(dishId){
        const dishs = await this.getAllDishs();

        const updatedDishs = dishs.filter(dish => dish.id !== dishId
    );
    if(updatedDishs.length === dishs.length)
    return Promise.reject({msg:"dish not found"});

    await DataService.saveJSONFile(dishsPath, updatedDishs);
    }
}

module.exports = DishModel;
