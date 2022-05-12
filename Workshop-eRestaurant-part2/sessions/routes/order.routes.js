const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const roleValidator = require("../middleware/role-validator-middleware");
// const sessionValidator = require("../middleware/session-validator.middleware");

// router.use(roleValidator);

router.get("/all",  OrderController.fetchAllOrders);

router.get("/:id",  OrderController.fetchOrderById);

router.post("/add", roleValidator, OrderController.createNewOrder);

router.patch("/:id/update",  roleValidator, OrderController.updateOrder);

router.patch("/:id/update-status", roleValidator, OrderController.updateStatus);

router.delete("/:id", roleValidator, OrderController.deleteOrder);

module.exports = router;