const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const roleValidator = require("../middleware/role-validator-middleware");
const sessionValidator = require("../middleware/session-validator.middleware");

router.use(roleValidator);
//Get all students
router.get("/all", OrderController.fetchAllOrders);
//Get students by id
router.get("/:id", OrderController.fetchOrderById);
//Create new student
router.post("/add", sessionValidator, OrderController.createNewOrder);
//Update student
router.patch("/:id/update",  OrderController.updateOrder);
//Update student status
router.patch("/:id/update-status", OrderController.updateStatus);
//Delete student
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;