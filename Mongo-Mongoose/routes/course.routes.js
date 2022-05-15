const router = require("express").Router();
const CourseController = require("../controllers/course.controller");

//1.get all Course
router.get("/", CourseController.getAllCourses);

router.get("/:id", CourseController.getCourseById);

router.post("/", CourseController.createCourse);

router.patch("/:id", CourseController.updateCourse);

router.delete("/:id", CourseController.deleteCourse);

router.patch("/:id/students", CourseController.updateStudents);

module.exports = router;