const router = require("express").Router();
const DishController = require("../controllers/dish.controller");
const sessionValidator = require("../middleware/session-validator.middleware");
const roleValidator = require("../middleware/role-validator-middleware");


router.use(roleValidator);
//Get all students
router.get("/all", sessionValidator, DishController.fetchAllDishs);
//Get students by id
router.get("/:id", sessionValidator, DishController.fetchDishById);
//Create new student
router.post("/add", DishController.createNewDish);
//Update student
router.patch("/:id/update", DishController.updateDish);
//Delete student
router.delete("/:id", DishController.deleteDish);

module.exports = router;
