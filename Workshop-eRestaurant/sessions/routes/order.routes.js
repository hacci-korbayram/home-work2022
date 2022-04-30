const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const roleValidator = require("../middleware/role-validator-middleware");
const sessionValidator = require("../middleware/session-validator.middleware");

// router.use(roleValidator);
//Get all orders
router.get("/all", sessionValidator, OrderController.fetchAllOrders);
//Get orders by id
router.get("/:id", sessionValidator, OrderController.fetchOrderById);
//Create new order
router.post("/add", roleValidator, OrderController.createNewOrder);
//Update order
router.patch("/:id/update",  roleValidator, OrderController.updateOrder);
//Update order status
router.patch("/:id/update-status", roleValidator, OrderController.updateStatus);
//Delete order
router.delete("/:id", roleValidator, OrderController.deleteOrder);

module.exports = router;