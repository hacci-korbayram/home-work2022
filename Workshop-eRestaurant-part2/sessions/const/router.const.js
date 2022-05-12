const router = require("express").Router();
const dishsRouter = require("../routes/dish.routes");
const authRouter = require("../routes/auth.routes");
const ordersRouter = require("../routes/order.routes");

router.use("/dishs", dishsRouter);
router.use("/auth", authRouter);
router.use("/orders", ordersRouter);


router.use(authRouter);

module.exports = router;
