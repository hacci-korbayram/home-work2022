const router = require("../routes/auth.routes");
const authRouter = require("../routes/auth.routes");

router.use("/auth", authRouter);

module.exports = router;