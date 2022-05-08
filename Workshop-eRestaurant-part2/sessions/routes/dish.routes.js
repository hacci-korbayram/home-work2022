const router = require("express").Router();
const DishController = require("../controllers/dish.controller");
const sessionValidator = require("../middleware/session-validator.middleware");
const roleValidator = require("../middleware/role-validator-middleware");


// router.use(roleValidator);

router.get("/all", sessionValidator, DishController.fetchAllDishs);

router.get("/:id", sessionValidator, DishController.fetchDishById);

router.post("/add",  roleValidator, DishController.createNewDish);

router.patch("/:id/update", roleValidator, DishController.updateDish);

router.delete("/:id", roleValidator, DishController.deleteDish);

module.exports = router;
