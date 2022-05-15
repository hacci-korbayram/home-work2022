const router = require("express").Router();

const studentRouter = require("../routes/student.routes");
const courseRouter = require("../routes/course.routes");

router.use("/students", studentRouter);
router.use("/courses", courseRouter);

module.exports = router;
