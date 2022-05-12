const router = require("express").Router();
const StudentController = require("../controllers/student.controller");

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getStudentById);

router.post("/", StudentController.createStudent);

router.patch("/:id", StudentController.updateStudent);

router.delete("/:id", StudentController.deleteStudent);

module.exports = router;