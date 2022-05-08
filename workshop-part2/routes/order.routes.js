const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const roleValidator = require("../middleware/role-validator-middleware");
const sessionValidator = require("../middleware/session-validator.middleware");


router.get("/all", sessionValidator, OrderController.fetchAllOrders);

router.get("/:id", sessionValidator, OrderController.fetchOrderById);

router.post("/add", roleValidator, DishController.createNewOrder);

router.patch("/:id/update", roleValidator,OrderController.updateOrder);

router.patch("/:id/update-status", roleValidator, OrderController.updateStatus);

router.delete("/id", roleValidator, OrderController.deleteOrder);

module.exports = router;