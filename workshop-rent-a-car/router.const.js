const router = require("express").Router();
const store = require("./routes/store.routes");

router.use("/store", store);

module.exports = router;
