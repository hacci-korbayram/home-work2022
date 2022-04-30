const router = require("express").Router();
const DishController = require("../controllers/dish.controller");
const sessionValidator = require("../middleware/session-validator.middleware");
const roleValidator = require("../middleware/role-validator-middleware");


// router.use(roleValidator);
//Get all dish
router.get("/all", sessionValidator, DishController.fetchAllDishs);
//Get dishs by id
router.get("/:id", sessionValidator, DishController.fetchDishById);
//Create new dish
router.post("/add",  roleValidator, DishController.createNewDish);
//Update dish
router.patch("/:id/update", roleValidator, DishController.updateDish);
//Delete dish
router.delete("/:id", roleValidator, DishController.deleteDish);

module.exports = router;
