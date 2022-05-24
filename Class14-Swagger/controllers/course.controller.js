const CourseService = require("../services/course.service");

class CourseController{
    static async getAllCourses(req,res){
        try {
            const courses = await CourseService.getAllCourses();

            res.status(200).send(courses);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async getCourseById(req, res){
        try {
            const {id: courseId } = req.params;

            const course = await CourseService.getCourseById(courseId);
            res.status(200).send(course);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    static async createCourse(req,res){
        try {
            const courseData = req.body.courseData;

            const createdCourse = await CourseService.createCourse(courseData);
            res.status(201).send(createdCourse);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async updateCourse(req, res) {
        try {
            const courseId = req.params.id;
            const updateData = req.body;

            const updatedCourse = await CourseService.updateCourse(courseId, updateData);
            res.status(200).send(updatedCourse);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async deleteCourse(req, res) {
        try {
            const courseId = req.params.id;
            const deletedCourse = await CourseService.deleteCourse(courseId);
            if(!deletedCourse){
                return res.status(400).send({message: "course not found"});
            }
            res.status(200).send(deletedCourse);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    static async updateStudents(req,res){
        try {
            const courseId = req.params.id;
            const studentIds = req.body.studentIds;
            const updatedCourse = await CourseService.updateStudents(courseId,studentIds);
        
            res.status(200).send(updatedCourse);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}
module.exports = CourseController